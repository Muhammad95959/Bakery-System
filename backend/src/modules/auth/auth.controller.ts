import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../config/db";
import { Role } from "../../generated/prisma/enums";
import safeUserData from "../../utils/safeUserData";

function signToken(id: string) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function authorize(_req: Request, res: Response) {
  res
    .status(200)
    .json({ status: "success", message: "User is authenticated", data: { user: safeUserData(res.locals.user) } });
}

export function restrict(...roles: Role[]) {
  return function (_req: Request, res: Response, next: NextFunction) {
    if (!roles.includes(res.locals.user.role))
      return res.status(403).json({ status: "fail", message: "You do not have permission to perform this action" });
    next();
  };
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ status: "fail", message: "You are not logged in" });
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    if (!decoded) throw new Error("Invalid token");
    const { id, iat } = decoded;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
    if (Math.floor(new Date(user.updatedAt).getTime() / 1000) > iat!)
      return res.status(401).json({ status: "fail", message: "User data was changed recently, Please login again" });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "fail", message: "Invalid or expired token" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ status: "fail", message: "Please provide username and password" });
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ status: "fail", message: "Invalid credentials" });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ status: "fail", message: "Invalid credentials" });
    res.cookie("jwt", signToken(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ status: "success", message: "User logged in successfully", data: { user: safeUserData(user) } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success", message: "Logged out successfully" });
}

import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import prisma from "../../config/db";
import { Role } from "../../generated/prisma/enums";
import safeUserData from "../../utils/safeUserData";

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ status: "success", data: { users: users.map((user) => safeUserData(user)) } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ status: "fail", message: "User was not found" });
    res.status(200).json({ status: "success", data: { user: safeUserData(user) } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ status: "fail", message: "Please provide username and password" });
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) return res.status(400).json({ status: "fail", message: "User already exists" });
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: encryptedPassword, role: role || Role.STAFF },
    });
    res.status(201).json({ status: "success", data: { user: safeUserData(newUser) } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const data: { username?: string; password?: string; role?: Role } = {};
    if (username) data.username = username;
    if (password) data.password = bcrypt.hashSync(password, 10);
    if (role) data.role = role.toUpperCase();
    const updatedUser = await prisma.user.update({ where: { id }, data });
    res.status(200).json({ status: "success", data: { user: safeUserData(updatedUser) } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ status: "success", message: "User was deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

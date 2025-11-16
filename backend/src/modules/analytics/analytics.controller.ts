import { Request, Response } from "express";
import prisma from "../../config/db";

export async function ordersToday(_req: Request, res: Response) {
  try {
    const data = await prisma.ordersToday.findFirst();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function topProduct(_req: Request, res: Response) {
  try {
    const data = await prisma.topProduct.findFirst();
    res.status(200).json({ status: "success", data: data || { name: "--" } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function lowestStockProducts(_req: Request, res: Response) {
  try {
    const data = await prisma.lowestStockProducts.findMany();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function weekRevenue(_req: Request, res: Response) {
  try {
    const data = await prisma.weekRevenue.findMany();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

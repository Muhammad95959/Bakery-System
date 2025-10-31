import { Request, Response } from "express";
import prisma from "../../config/db";

export async function getAllCustomers(_req: Request, res: Response) {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json({ status: "success", data: { customers } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function getCustomerById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) return res.status(404).json({ status: "fail", message: "Customer was not found" });
    res.status(200).json({ status: "success", data: { customer } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const { name, email, phone, address } = req.body;
    if (!name) return res.status(400).json({ status: "fail", message: "Please provide name" });
    if (email) {
      const existingEmail = await prisma.customer.findFirst({ where: { email } });
      if (existingEmail) return res.status(400).json({ status: "fail", message: "Email already exists" });
    }
    if (phone) {
      const existingPhone = await prisma.customer.findFirst({ where: { phone } });
      if (existingPhone) return res.status(400).json({ status: "fail", message: "Phone already exists" });
    }
    const customer = await prisma.customer.create({ data: { name, email, phone, address } });
    res.status(201).json({ status: "success", data: { customer } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const customer = await prisma.customer.update({ where: { id }, data: { name, email, phone, address } });
    res.status(200).json({ status: "success", data: { customer } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.customer.delete({ where: { id } });
    res.status(200).json({ status: "success", message: "Customer was deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

import { Request, Response } from "express";
import { promises as fs } from "fs";
import multer from "multer";
import path from "path";
import prisma from "../../config/db";
import SharpMulter from "sharp-multer";
import { Product } from "../../generated/prisma/browser";

const storage = SharpMulter({
  destination: (_req: any, _file: any, callback: (arg0: null, arg1: string) => any) => callback(null, "uploads"),
  filename: (originalName: string, options: { fileFormat: any }) => {
    const name = originalName.split(".")[0];
    return `${Date.now()}-${name}.${options.fileFormat}`;
  },
  imageOptions: {
    fileFormat: "jpg",
    quality: 80,
    resize: { width: 288, height: 288 },
  },
});

export const upload = multer({ storage });

export async function getAllProducts(_req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({ where: { deleted: false } });
    res.status(200).json({ status: "success", data: { products } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) return res.status(404).json({ status: "fail", message: "Product was not found" });
    res.status(200).json({ status: "success", data: { product } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const filename = req.file?.filename;
    const { name, category, price, stock } = req.body;
    const product = await prisma.product.create({ data: { name, category, price, stock, image: filename } });
    res.status(201).json({ status: "success", data: { product } });
  } catch (err) {
    console.log(err);
    if (req.file) {
      const imagePath = path.resolve("uploads", req.file.filename);
      try {
        await fs.unlink(imagePath);
      } catch (err: any) {
        console.warn(`Failed to delete image: ${imagePath}`, err);
      }
    }
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { removeImage } = req.query;
    const filename = req.file?.filename;
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock)
      return res.status(400).json({ status: "fail", message: "Please provide all the required fields" });
    const oldProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!oldProduct) return res.status(404).json({ status: "fail", message: "Product was not found" });
    let imageName = oldProduct.image;
    if (filename) imageName = filename;
    else if (removeImage === "true") imageName = null;
    if (filename || removeImage === "true") await deleteProductImage(oldProduct);
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, category, price, stock, image: imageName },
    });
    res.status(200).json({ status: "success", data: { product } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const oldProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!oldProduct) return res.status(404).json({ status: "fail", message: "Product was not found" });
    await prisma.product.update({ where: { id: parseInt(id) }, data: { deleted: true } });
    res.status(200).json({ status: "success", message: "Product was deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

async function deleteProductImage(product: Product) {
  if (product.image) {
    const imagePath = path.resolve("uploads", product.image);
    try {
      await fs.unlink(imagePath);
    } catch (err: any) {
      console.warn(`Failed to delete image: ${imagePath}`, err);
    }
  }
}

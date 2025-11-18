import { del, put, PutBlobResult } from "@vercel/blob";
import { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import prisma from "../../config/db";
import { Product } from "../../generated/prisma/browser";

const upload = multer({ storage: multer.memoryStorage() });

export const multerMiddleware = upload.single("image");

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
  let blob: PutBlobResult | null = null;
  try {
    const file = req.file;
    if (file) {
      const { buffer, originalname } = file;
      const processed = await sharp(buffer).resize(288, 288).jpeg({ quality: 80 }).toBuffer();
      const filename = `${Date.now()}-${originalname.split(".")[0]}.jpg`;
      blob = await put(`uploads/${filename}`, processed, {
        access: "public",
        contentType: "image/jpeg",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }
    const { name, category, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, category, price, stock, image: blob ? blob.url : null },
    });
    res.status(201).json({ status: "success", data: { product } });
  } catch (err) {
    console.log(err);
    if (blob) {
      try {
        await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      } catch (err: any) {
        console.log(`Failed to delete Blob image: ${blob.url}`, err);
      }
    }
    if ((err as Error).message.includes("Vercel Blob: Access denied, please provide a valid token for this resource."))
      res.status(401).json({ status: "fail", message: "Please provide a valid vercel token" });
    else res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { removeImage } = req.query;
    const file = req.file;
    let blob: PutBlobResult | null = null;
    if (file) {
      const { buffer, originalname } = file;
      const processed = await sharp(buffer).resize(288, 288).jpeg({ quality: 80 }).toBuffer();
      const filename = `${Date.now()}-${originalname.split(".")[0]}.jpg`;
      blob = await put(`uploads/${filename}`, processed, {
        access: "public",
        contentType: "image/jpeg",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock)
      return res.status(400).json({ status: "fail", message: "Please provide all the required fields" });
    const oldProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!oldProduct) return res.status(404).json({ status: "fail", message: "Product was not found" });
    let image = oldProduct.image;
    if (blob) image = blob.url;
    else if (removeImage === "true") image = null;
    if (blob || removeImage === "true") await deleteProductImage(oldProduct);
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, category, price, stock, image },
    });
    res.status(200).json({ status: "success", data: { product } });
  } catch (err) {
    console.log(err);
    if ((err as Error).message.includes("Vercel Blob: Access denied, please provide a valid token for this resource."))
      res.status(401).json({ status: "fail", message: "Please provide a valid vercel token" });
    else res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const oldProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!oldProduct) return res.status(404).json({ status: "fail", message: "Product was not found" });
    if (oldProduct.image) await del(oldProduct.image, { token: process.env.BLOB_READ_WRITE_TOKEN });
    await prisma.product.update({ where: { id: parseInt(id) }, data: { deleted: true } });
    res.status(200).json({ status: "success", message: "Product was deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

async function deleteProductImage(product: Product) {
  try {
    if (!product.image) return;
    await del(product.image, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch (err) {
    console.log(`Failed to delete Blob image: ${product.image}`, err);
  }
}

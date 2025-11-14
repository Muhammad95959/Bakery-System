import { Request, Response } from "express";
import prisma from "../../config/db";
import { OrderStatus, PaymentMethod } from "../../generated/prisma/enums";

export async function getAllOrders(_req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany();
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const cart = await prisma.cart.findMany({ where: { orderId: order.id } });
        return { ...order, cart };
      }),
    );
    res.status(200).json({ status: "success", data: { orders: ordersWithItems } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });
    if (!order) return res.status(404).json({ status: "fail", message: "Order was not found" });
    const cart = await prisma.cart.findMany({ where: { orderId: order.id } });
    res.status(200).json({ status: "success", data: { order: { ...order, cart } } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function placeOrder(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const { customer, status, paymentMethod, orderItems } = req.body as {
      customer: string;
      status: OrderStatus;
      paymentMethod: PaymentMethod;
      orderItems: { productId: number; quantity: number }[];
    };
    if (orderItems.length === 0)
      return res.status(400).json({ status: "fail", message: "Please provide at least one product" });
    if (!customer || !status || !paymentMethod)
      return res.status(400).json({ status: "fail", message: "Please provide all the required fields" });
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data: { userId, customer, status, paymentMethod } });
      const productIds = orderItems.map((item) => item.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true, stock: true },
      });
      let total = 0;
      for (const item of orderItems) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} was not found`);
        const updatedProduct = await tx.product.update({
          where: { id: product.id },
          data: { stock: Number(product.stock) - item.quantity },
        });
        if (Number(updatedProduct.stock) < 0) throw new Error(`${updatedProduct.name} is out of stock`);
        total += Number(product.price) * item.quantity;
      }
      await tx.orderItem.createMany({ data: orderItems.map((item) => ({ orderId: order.id, ...item })) });
      const updatedOrder = await tx.order.update({ where: { id: order.id }, data: { total } });
      return updatedOrder;
    });
    res.status(201).json({
      status: "success",
      message: "Order was placed successfully",
      data: { order: newOrder, items: orderItems },
    });
  } catch (err) {
    console.log(err);
    if ((err as Error).message.includes("was not found"))
      return res.status(404).json({ status: "fail", message: (err as Error).message });
    else if ((err as Error).message.includes("is out of stock"))
      return res.status(400).json({ status: "fail", message: (err as Error).message });
    else res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

export async function undoOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const oldOrder = await prisma.order.findUnique({ where: { id: parseInt(id) } });
    if (!oldOrder) return res.status(404).json({ status: "fail", message: "Order was not found" });
    if (oldOrder.status === OrderStatus.CANCELED)
      return res.status(400).json({ status: "fail", message: "Order is already canceled" });
    const [newOrder, orderItems] = await prisma.$transaction(async (tx) => {
      const orderItems = await tx.orderItem.findMany({
        where: { orderId: oldOrder.id },
        select: { productId: true, quantity: true },
      });
      const productIds = orderItems.map((item) => item.productId).filter((id) => id !== null);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stock: true },
      });
      for (const item of orderItems) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} was not found`);
        await tx.product.update({
          where: { id: product.id },
          data: { stock: Number(product.stock) + item.quantity },
        });
      }
      const newOrder = await tx.order.update({
        where: { id: oldOrder.id },
        data: {
          status: OrderStatus.CANCELED,
        },
      });
      return [newOrder, orderItems];
    });
    res.status(200).json({
      status: "success",
      message: "Order was canceled successfully",
      data: { order: newOrder, items: orderItems },
    });
  } catch (err) {
    console.log(err);
    if ((err as Error).message.includes("was not found"))
      return res.status(404).json({ status: "fail", message: (err as Error).message });
    else res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
}

import express from "express";
import * as authController from "../auth/auth.controller";
import * as analyticsController from "./analytics.controller";

const router = express.Router();

router.get("/orders-today", authController.protect, analyticsController.ordersToday);

router.get("/top-product", authController.protect, analyticsController.topProduct);

router.get("/lowest-stock-products", authController.protect, analyticsController.lowestStockProducts);

router.get("/week-revenue", authController.protect, analyticsController.weekRevenue);

export default router;

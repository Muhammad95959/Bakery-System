import express from "express";
import * as authController from "../auth/auth.controller";
import * as ordersController from "./orders.controller";

const router = express.Router();

router.get("/", authController.protect, ordersController.getAllOrders);

router.get("/:id", authController.protect, ordersController.getOrderById);

router.post("/place-order", authController.protect, ordersController.placeOrder);

router.get("/:id/undo-order", authController.protect, authController.restrict("ADMIN"), ordersController.undoOrder);

export default router;

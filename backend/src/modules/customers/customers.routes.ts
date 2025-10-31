import express from "express";
import * as authController from "../auth/auth.controller";
import * as customersController from "./customers.controller";

const router = express.Router();

router.get("/", authController.protect, customersController.getAllCustomers);

router.get("/:id", authController.protect, customersController.getCustomerById);

router.post("/", authController.protect, customersController.createCustomer);

router.put("/:id", authController.protect, customersController.updateCustomer);

router.delete("/:id", authController.protect, customersController.deleteCustomer);

export default router;

import express from "express";
import { Role } from "../../generated/prisma/enums";
import * as authController from "../auth/auth.controller";
import * as customersController from "./customers.controller";

const router = express.Router();

router.get("/", authController.protect, customersController.getAllCustomers);

router.get("/:id", authController.protect, customersController.getCustomerById);

router.post("/", authController.protect, customersController.createCustomer);

router.put("/:id", authController.protect, authController.restrict(Role.ADMIN), customersController.updateCustomer);

router.delete("/:id", authController.protect, authController.restrict(Role.ADMIN), customersController.deleteCustomer);

export default router;

import express from "express";
import { Role } from "../../generated/prisma/enums";
import * as authController from "../auth/auth.controller";
import * as productsController from "./products.controller";

const router = express.Router();

router.get("/", authController.protect, productsController.getAllProducts);

router.get("/:id", authController.protect, productsController.getProductById);

router.post(
  "/",
  authController.protect,
  authController.restrict(Role.ADMIN),
  productsController.upload.single("image"),
  productsController.createProduct,
);

router.put(
  "/:id",
  authController.protect,
  authController.restrict(Role.ADMIN),
  productsController.upload.single("image"),
  productsController.updateProduct,
);

router.delete("/:id", authController.protect, authController.restrict(Role.ADMIN), productsController.deleteProduct);

export default router;

import express from "express";
import * as authController from "./auth.controller";

const router = express.Router();

router.get("/", authController.authorize);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

export default router;

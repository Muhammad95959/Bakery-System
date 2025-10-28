import express from "express";
import * as authController from "../auth/auth.controller";
import * as usersController from "./users.controller";
import { Role } from "../../generated/prisma/enums";

const router = express.Router();

router.get("/", authController.protect, usersController.getAllUsers);

router.get("/:id", authController.protect, usersController.getOneUser);

router.post("/", authController.protect, authController.restrict(Role.ADMIN), usersController.createUser);

router.patch("/:id", authController.protect, authController.restrict(Role.ADMIN), usersController.updateUser);

router.delete("/:id", authController.protect, authController.restrict(Role.ADMIN), usersController.deleteUser);

export default router;

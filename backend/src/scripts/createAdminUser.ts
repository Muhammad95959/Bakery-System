import bcrypt from "bcryptjs";
import { Role } from "../generated/prisma/enums";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();
const role = Role.ADMIN;
const username = "admin";
const password = "admin";
const encryptedPassword = bcrypt.hashSync(password, 10);

(async () => {
  try {
    await prisma.user.create({ data: { role, username, password: encryptedPassword } });
    console.log("Admin user was created");
  } catch (err) {
    console.log(err);
  }
})();

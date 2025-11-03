import { User } from "../generated/prisma/client";

export default function safeUserData(user: User) {
  const { id, username, role, phone, address, status, createdAt, updatedAt } = user;
  return { id, username, role, phone, address, status, createdAt, updatedAt };
}

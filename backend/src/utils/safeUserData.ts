import { User } from "../generated/prisma/client";

export default function safeUserData(user: User) {
  const { id, username, role, createdAt, updatedAt } = user;
  return { id, username, role, createdAt, updatedAt };
}


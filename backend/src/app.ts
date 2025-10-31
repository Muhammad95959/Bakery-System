import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRouter from "./modules/auth/auth.routes";
import usersRouter from "./modules/users/users.routes";
import customerRouter from "./modules/customers/customers.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (_req, res) => res.end("Bakery API"));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/customers", customerRouter);

export default app;

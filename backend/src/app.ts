import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (_req, res) => res.end("Bakery API"));
app.use("/api/auth", authRouter);

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import analyticsRouter from "./modules/analytics/analytics.routes";
import authRouter from "./modules/auth/auth.routes";
import customerRouter from "./modules/customers/customers.routes";
import ordersRouter from "./modules/orders/orders.routes";
import productsRouter from "./modules/products/products.routes";
import usersRouter from "./modules/users/users.routes";

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowed =
        origin.startsWith("http://localhost:") ||
        origin.endsWith(".netlify.app");
      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.end("Bakery API"));
app.use("/api/analytics", analyticsRouter);
app.use("/api/auth", authRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/images", express.static("uploads"));

export default app;

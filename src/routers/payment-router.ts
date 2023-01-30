import { Router } from "express";
import { getPayment, postPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", postPayment);

export { paymentRouter };

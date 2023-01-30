import  httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import  paymentService  from "@/services/payment-service";
import { Response } from "express";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  try {
    if(!ticketId) return res.sendStatus(400);
    const payment = await paymentService.getPayment(Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}


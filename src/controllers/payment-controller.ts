import  ticketsService  from "@/services/ticket-service";
import  httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import  paymentService  from "@/services/payment-service";
import { Response } from "express";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  try {
    if(!req) return res.sendStatus(401);
    if(!ticketId) return res.sendStatus(400);
    const payment = await paymentService.getPayment(Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;
  try{
    if(!ticketId) return res.sendStatus(400);
    const payment = await paymentService.postPayment(userId, ticketId, cardData);
    await ticketsService.updateTicket(ticketId);
    return res.send(payment);
  }catch(err) {
    return res.sendStatus(400);
  }
}


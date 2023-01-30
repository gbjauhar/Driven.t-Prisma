import  httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/ticket-service";
import { Response } from "express";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticket);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}


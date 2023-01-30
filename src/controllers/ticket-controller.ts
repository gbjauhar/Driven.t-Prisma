import  httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/ticket-service";
import { Response } from "express";
import enrollmentsService from "@/services/enrollments-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticket);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTickets(userId);
    return res.status(200).send(ticket[0]);
  } catch(err) {
    return res.sendStatus(404);
  }
}

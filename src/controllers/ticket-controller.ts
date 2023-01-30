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

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTickets(userId);
    return res.status(200).send(ticket[0]);
  }catch(err) {
    if(err.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    }
    if(err.name === "NotFoundError" || err.name === "Error") {
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  try{
    if(!ticketTypeId) return res.sendStatus(400);
    const ticket = await ticketsService.getTickets(userId);
    const create = await ticketsService.postTicket(ticketTypeId, ticket[0].enrollmentId);
    return res.status(201).send(create);
  }catch(err) {
    if(err.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    }
    if(err.name === "NotFoundError" || err.name === "Error") {
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

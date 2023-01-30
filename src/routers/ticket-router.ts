import { getTickets, getTicketTypes, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets)
  .post("/", postTickets);

export { ticketRouter };

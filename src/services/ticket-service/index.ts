import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getTicketTypes() {
  const tickets = await ticketRepository.findMany();
  if (!tickets) throw notFoundError();
  
  return tickets;
}

const ticketsService = {
  getTicketTypes,
};

export default ticketsService;
  

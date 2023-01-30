import  enrollmentsService from "@/services/enrollments-service";
import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getTicketTypes() {
  const tickets = await ticketRepository.findMany();
  if (!tickets) throw notFoundError();
  
  return tickets;
}

async function getTickets(userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  const tickets = await ticketRepository.findUnique(enrollment.id);
  if (!tickets) throw notFoundError();
  
  return tickets;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
};

export default ticketsService;
  

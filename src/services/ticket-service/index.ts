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

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await ticketRepository.create(ticketTypeId, enrollmentId);
  if(!ticket) throw notFoundError();
  return ticket;
}

async function updateTicket(ticketId: number) {
  const ticket = await ticketRepository.update(ticketId);
  if(!ticket) throw notFoundError();
  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
  postTicket,
  updateTicket,
};

export default ticketsService;
  

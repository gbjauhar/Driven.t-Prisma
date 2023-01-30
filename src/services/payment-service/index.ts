import { notFoundError } from "@/errors";
import { CardData } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";
import ticketsService from "../ticket-service";

async function getPayment(ticketId: number) {
  const payments = await paymentRepository.retrieve(ticketId);
  if (!payments) throw notFoundError();

  return {
    cardIssuer: payments[0].cardIssuer,
    cardLastDigits: payments[0].cardLastDigits,
    createdAt: payments[0].createdAt,
    id: payments[0].id,
    ticketId: payments[0].ticketId,
    updatedAt: payments[0].updatedAt,
    value: payments[0].value,
  };
}

async function postPayment(userId: number, ticketId: number, cardData: CardData) {
  const ticket = await ticketsService.getTickets(userId);
  const payments = await paymentRepository.create(ticketId, cardData, ticket[0].TicketType.price);
  if(!payments) throw notFoundError();
  return { ...payments, cardLastDigits: payments.cardLastDigits.slice(11) };
}

const paymentService = {
  getPayment,
  postPayment,
};

export default paymentService;
  

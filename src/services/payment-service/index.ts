import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";

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

const paymentService = {
  getPayment,
};

export default paymentService;
  

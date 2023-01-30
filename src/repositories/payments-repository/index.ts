import { prisma } from "@/config";
import { CardData } from "@/protocols";

async function retrieve(ticketId: number) {
  return prisma.payment.findMany({ where: { ticketId: ticketId } });
}

async function create(ticketId: number, cardData: CardData, value: number) {
  return prisma.payment.create({ data: { ticketId: ticketId, cardIssuer: cardData.issuer, cardLastDigits: cardData.number.toString(), value: value } });
}
const paymentRepository = {
  retrieve,
  create,
};

export default paymentRepository;

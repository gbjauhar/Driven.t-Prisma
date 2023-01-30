import { prisma } from "@/config";

async function retrieve(ticketId: number) {
  return prisma.payment.findMany({ where: { ticketId: ticketId } });
}

const paymentRepository = {
  retrieve,
};

export default paymentRepository;

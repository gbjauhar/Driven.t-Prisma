import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findUnique(enrollmentId: number) {
  return prisma.ticket.findMany({ where: { enrollmentId: enrollmentId }, include: { TicketType: true } });
}

const ticketRepository = {
  findMany,
  findUnique,
};

export default ticketRepository;

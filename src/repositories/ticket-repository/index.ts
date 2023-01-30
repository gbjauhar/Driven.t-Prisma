import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findUnique(enrollmentId: number) {
  return prisma.ticket.findMany({ where: { enrollmentId: enrollmentId }, include: { TicketType: true } });
}

async function update(ticketId: number) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { status: "PAID" } });
}

const ticketRepository = {
  findMany,
  findUnique,
  update,
};

export default ticketRepository;

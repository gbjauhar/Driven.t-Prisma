import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findUnique(id: number) {
  return prisma.ticket.findUnique({ where: { id: id } });
}

const ticketRepository = {
  findMany,
  findUnique,
};

export default ticketRepository;

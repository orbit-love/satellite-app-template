import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
  const prisma = new PrismaClient();

  try {
    const members = await prisma.member.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(members);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
}

import prisma from "../../lib/db";
import { getAllMembers } from "../../helpers/prisma-helpers";

export default async function handle(req, res) {
  try {
    const members = await getAllMembers();

    res.status(200).json(members);
  } catch (e) {
    console.error(`Something went wrong. ${e.message}`);
    res.status(500).send();
  } finally {
    await prisma.$disconnect();
  }
}

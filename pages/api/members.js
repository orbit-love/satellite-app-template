import prisma from "../../lib/db";
import { getAllMembers } from "../../helpers/prisma-helpers";
import { withAuthCheck, withMethodCheck } from "../../helpers/api-helpers";

async function handle(req, res) {
  try {
    const featured = await getAllMembers({ where: { featured: true } });
    const members = await getAllMembers({ where: { featured: false } });

    res.status(200).json({ featured, members });
  } catch (e) {
    console.error(`Something went wrong. ${e.message}`);
    res.status(500).send();
  } finally {
    await prisma.$disconnect();
  }
}

export default withAuthCheck(withMethodCheck(handle, "GET"));

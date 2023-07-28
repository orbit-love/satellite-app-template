import prisma from "../../lib/db";
import { getAllMembers } from "../../helpers/prisma-helpers";
import { withAuthCheck, withMethodCheck } from "../../helpers/api-helpers";

export async function handle(req, res) {
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

export default withAuthCheck(withMethodCheck(handle, "GET"));

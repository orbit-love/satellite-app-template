import prisma from "../../lib/db";
import { getAllMembers } from "../../helpers/prisma-helpers";

export default async function handle(req, res) {
  try {
    if (req.method !== "POST") {
      console.error("Only POST requests permitted");
      res.status(405).send();
      return;
    }

    const members = await getAllMembers();

    if (members.length > 0) {
      console.error(
        "This request can only be used to instantiate the first member"
      );
      res.status(409).send();
      return;
    }

    const member = await prisma.member.create({
      data: {
        email: process.env.ROOT_USER_EMAIL,
        admin: true,
        name: req.body.name,
        avatar_url: req.body.avatar_url,
      },
    });

    res.status(200).json(member);
  } catch (e) {
    console.error(`Something went wrong. ${e.message}`);
    res.status(500);
  } finally {
    await prisma.$disconnect();
  }
}

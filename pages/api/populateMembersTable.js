import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
  const prisma = new PrismaClient();
  const members = await fetchData();

  const upsertPromises = members.map(async (member) => {
    prisma.member.upsert({
      where: {
        email: member.attributes.email,
      },
      update: {
        name: member.attributes.name,
      },
      create: {
        email: member.attributes.email,
        name: member.attributes.name,
      },
    });
  });

  await Promise.all(upsertPromises);
}

export async function fetchData() {
  const response = await fetch(
    "https://app.orbit.love/api/v1/delete44/members?identity=email",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const members = await response.json();

  return members.data;
}

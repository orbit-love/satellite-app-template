import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests permitted" });
    return;
  }

  const prisma = new PrismaClient();
  const members = await fetchData();

  // Update or create members that are in Orbit but not Prisma
  let prismaPromises = members.map(async (member) =>
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
    })
  );

  // Destroy members that are in Prisma but not in Orbit
  const removeList = await membersToRemove(prisma, members);
  prismaPromises.push(
    prisma.member.deleteMany({
      where: {
        email: { in: removeList },
      },
    })
  );

  // Resolve requests
  await Promise.all(prismaPromises);

  res.status(200).send({
    members: await prisma.member.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  });
}

async function membersToRemove(prisma, orbitMembers) {
  const prismaMemberEmails = await fetchMemberEmailsFromPrisma(prisma);
  const orbitMemberEmails = orbitMembers.map(
    (member) => member.attributes.email
  );

  return prismaMemberEmails.filter(
    (email) => !orbitMemberEmails.includes(email)
  );
}

async function fetchMemberEmailsFromPrisma(prisma) {
  const allEmails = await prisma.member.findMany({
    select: {
      email: true,
      // TODO: Add check for admin field here so we don't remove admins
    },
  });

  return allEmails.map((member) => member.email);
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

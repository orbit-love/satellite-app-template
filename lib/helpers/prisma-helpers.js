import prisma from "../db";

export async function upsertMember(member) {
  const { email, name } = member.attributes;
  return prisma.member.upsert({
    where: { email },
    update: { name },
    create: { email, name },
  });
}

export async function removeMembers(removeList) {
  return prisma.member.deleteMany({
    where: {
      email: { in: removeList },
    },
  });
}

export async function getAllMembers() {
  return prisma.member.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAllMemberEmails() {
  const allEmails = await prisma.member.findMany({
    select: {
      email: true,
      // TODO: Add check for admin field here so we don't remove admins
    },
  });

  return allEmails.map((member) => member.email);
}

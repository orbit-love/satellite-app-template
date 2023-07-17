import prisma from "../db";

/**
 * upsert a member in the database
 * if a member with the same email already exists, the name will be updated
 * otherwise, a new member is created
 *
 * @param {Object} member - the member to upsert. from the Orbit API
 * @param {Object} member.attributes - the member info, including:
 * @param {string} member.attributes.email
 * @param {string} member.attributes.name
 * @returns {Promise} a Promise that resolves with the upserted member
 */
export async function upsertMember(member) {
  const { email, name } = member.attributes;
  return prisma.member.upsert({
    where: { email },
    update: { name },
    create: { email, name },
  });
}

/**
 * remove members from the database by their email
 *
 * @param {string[]} removeList - an array of member emails to remove
 * @returns {Promise} a Promise that resolves when the members have been removed
 */
export async function removeMembers(removeList) {
  return prisma.member.deleteMany({
    where: {
      email: { in: removeList },
    },
  });
}

/**
 * fetch all members from the database, ordered by name in ascending order
 *
 * @returns {Promise} a Promise that resolves with all members
 */
export async function getAllMembers() {
  return prisma.member.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * fetch just the emails of all members from the database
 *
 * @returns {Promise} a Promise that resolves with an array of all member emails
 */
export async function getAllMemberEmails() {
  const allEmails = await prisma.member.findMany({
    select: {
      email: true,
      // TODO: Add check for admin field here so we don't remove admins
    },
  });

  return allEmails.map((member) => member.email);
}

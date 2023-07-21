import {
  upsertMember,
  removeMembers,
  getAllMembers,
  getAllMemberEmails,
} from "../../helpers/prisma-helpers";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    console.error("Only POST requests permitted");
    res.status(405).send();
    return;
  }

  const memberData = await fetchOrbitData();

  // Delete all existing identities
  await prisma.identity.deleteMany();

  // Update or create members that are in Orbit but not Prisma
  let prismaPromises = memberData.data.map(async (member) =>
    upsertMember(member, memberData.included)
  );

  // Destroy members that are in Prisma but not in Orbit
  const removeList = await membersToRemove(memberData.data);
  prismaPromises.push(removeMembers(removeList));

  // Resolve requests
  await Promise.all(prismaPromises);

  res.status(200).send({
    members: await getAllMembers(),
  });
}

/**
 * find members that are in Prisma but not in Orbit
 *
 * @param {Object[]} orbitMembers - an array of member objects from Orbit
 * @returns {Promise} a Promise that resolves with an array of emails of members to be removed
 */
export async function membersToRemove(orbitMembers) {
  const prismaMemberEmails = await getAllMemberEmails({
    where: {
      admin: false,
    },
  });
  const orbitMemberEmails = orbitMembers.map(
    (member) => member.attributes.email
  );

  return prismaMemberEmails.filter(
    (email) => !orbitMemberEmails.includes(email)
  );
}

/**
 * fetch data from Orbit API
 *
 * @returns {Promise} a Promise that resolves with an array of member objects
 */
export async function fetchOrbitData() {
  const url = new URL(
    `https://app.orbit.love/api/v1/${process.env.WORKSPACE_SLUG}/members`
  );

  const params = new URLSearchParams({
    identity: "email",
    member_tags: process.env.ORBIT_TAG,
  });

  url.search = params.toString();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const members = await response.json();

  return members;
}

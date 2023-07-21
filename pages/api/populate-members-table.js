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

  const { members, included } = await fetchOrbitData();

  // Delete all existing identities
  await prisma.identity.deleteMany();

  // Update or create members that are in Orbit but not Prisma
  let prismaPromises = members.map(async (member) =>
    upsertMember(member, included)
  );

  // Destroy members that are in Prisma but not in Orbit
  const removeList = await membersToRemove(members);
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
 * fetches data from Orbit API, including all pages of data due to pagination.
 * by default, it starts with the first page of data for the specified member tags and identity,
 * and then recursively fetches data from each subsequent page until no more pages are available.
 *
 * @param {string} url - the API url for fetching data. by default, it includes query parameters for member tags and identity.
 *                       these are then included in recursions automatically thanks to the Orbit API
 * @param {Object[]} members - an array to accumulate the data fetched from the API. initially, it should be an empty array
 * @param {Object[]} included - an array to accumulate the 'included' data fetched from the API. initially, it should be an empty array
 * @returns {Promise<Object>} a Promise that resolves with an object containing two properties: 'members' and 'included',
 *                            each of which is an array of objects retrieved from the API
 */
export async function fetchOrbitData(
  url = `https://app.orbit.love/api/v1/${process.env.WORKSPACE_SLUG}/members?identity=email&member_tags=${process.env.ORBIT_TAG}&items=1`,
  members = [],
  included = []
) {
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  members.push(...responseData.data);
  included.push(...responseData.included);

  if (responseData.links.next) {
    return fetchOrbitData(responseData.links.next, members, included);
  }

  return { members, included };
}

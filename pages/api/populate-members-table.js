import {
  upsertMember,
  removeMembers,
  getAllMembers,
  getAllMemberEmails,
} from "../../lib/helpers/prisma-helpers";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests permitted" });
    return;
  }

  const members = await fetchData();

  // Update or create members that are in Orbit but not Prisma
  let prismaPromises = members.map(async (member) => upsertMember(member));

  // Destroy members that are in Prisma but not in Orbit
  const removeList = await membersToRemove(members);
  prismaPromises.push(removeMembers(removeList));

  // Resolve requests
  await Promise.all(prismaPromises);

  res.status(200).send({
    members: await getAllMembers(),
  });
}

async function membersToRemove(orbitMembers) {
  const prismaMemberEmails = await getAllMemberEmails();
  const orbitMemberEmails = orbitMembers.map(
    (member) => member.attributes.email
  );

  return prismaMemberEmails.filter(
    (email) => !orbitMemberEmails.includes(email)
  );
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

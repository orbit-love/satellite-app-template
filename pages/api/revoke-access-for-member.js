import { updateMember } from "../../helpers/prisma-helpers";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    console.error("Only POST requests permitted");
    res.status(405).send();
    return;
  }

  try {
    // Attempt to update the user
    await updateMember(req.body);

    res.status(200).send();
  } catch (error) {
    // If an error occurred, send back a 400 status.
    // Log error message serverside
    console.error(`Error updating user: ${error.message}`);
    res.status(400).send();
  }
}

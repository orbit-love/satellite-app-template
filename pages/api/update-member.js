import { updateMember } from "../../helpers/prisma-helpers";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests permitted" });
    return;
  }

  try {
    // Attempt to update the user
    await updateMember(req.body);

    res.status(200).send();
  } catch (error) {
    // If an error occurred, send back a 500 status and the error message
    res.status(500).send({ message: `Error updating user: ${error.message}` });
  }
}

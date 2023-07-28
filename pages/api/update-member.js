import { updateMember } from "../../helpers/prisma-helpers";
import { withAuthCheck, withMethodCheck } from "../../helpers/api-helpers";

async function handle(req, res) {
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

export default withAuthCheck(withMethodCheck(handle));

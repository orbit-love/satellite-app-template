import {
  withAuthCheck,
  withMethodCheck,
  withAdminCheck,
} from "../../helpers/api-helpers";

// THIS IS HANDLED SEPARATELY TO THE USUAL UPDATE FUNCTION
// This is because we don't want to expose the admin-only fields
// to the update function that can be called via an authenticated
// API request.
async function handle(req, res) {
  try {
    // Attempt to update the user
    await prisma.member.update({
      where: { id: parseInt(req.body.id) },
      data: { featured: req.body.featured },
    });

    res.status(200).send();
  } catch (error) {
    // If an error occurred, send back a 400 status.
    // Log error message serverside
    console.error(`Error updating user: ${error.message}`);
    res.status(400).send();
  }
}

export default withAdminCheck(withAuthCheck(withMethodCheck(handle)));

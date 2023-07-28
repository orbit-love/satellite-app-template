import { membersToRemove } from "./populate-members-table";
import { getAllMemberEmails } from "../../helpers/prisma-helpers";

// ------------------------------------------------------
// Required when testing a route with withAuthCheck
jest.mock("./auth/[...nextauth]", () => ({
  authOptions: {},
}));

// Mock a valid session
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { email: "test@test.com" },
  }),
}));
// ------------------------------------------------------

jest.mock("../../helpers/prisma-helpers", () => ({
  getAllMemberEmails: jest.fn(),
}));

describe("membersToRemove", () => {
  it("returns members that are present in prisma but not in Orbit", async () => {
    const orbitMembers = [
      { attributes: { email: "orbit1@example.com" } },
      { attributes: { email: "orbit2@example.com" } },
    ];

    getAllMemberEmails.mockResolvedValue([
      "prisma1@example.com",
      "prisma2@example.com",
      "orbit1@example.com",
    ]);

    const result = await membersToRemove(orbitMembers);

    expect(result).toEqual(["prisma1@example.com", "prisma2@example.com"]);
  });
});

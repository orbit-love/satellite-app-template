import { handle } from "./members";
import { getAllMembers } from "../../helpers/prisma-helpers";

// ------------------------------------------------------
// Required when testing a route with withAuthCheck
jest.mock("./auth/[...nextauth]", () => ({
  authOptions: {},
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));
// ------------------------------------------------------

jest.mock("../../helpers/prisma-helpers", () => ({
  getAllMembers: jest.fn(),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  json: jest.fn(),
};

describe("/api/members", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 and returns members", async () => {
    const expectedMembers = [
      { id: 1, email: "member1@faker.com" },
      { id: 2, email: "member2@faker.com" },
    ];
    getAllMembers.mockResolvedValueOnce(expectedMembers);

    const req = { method: "GET" };

    await handle(req, res);

    // Fetches all members
    expect(getAllMembers).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedMembers);
  });

  it("responds with 500 when prisma query fails", async () => {
    getAllMembers.mockRejectedValueOnce(new Error("Test Error"));
    const req = { method: "GET" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});

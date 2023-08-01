import handle from "./members";
import { getAllMembers } from "../../helpers/prisma-helpers";

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

  it("responds with 200 and returns members & features seperately", async () => {
    const expectedFeatures = [
      { id: 1, email: "featured1@faker.com" },
      { id: 2, email: "featured2@faker.com" },
    ];

    const expectedMembers = [
      { id: 1, email: "member1@faker.com" },
      { id: 2, email: "member2@faker.com" },
    ];
    getAllMembers.mockResolvedValueOnce(expectedFeatures);
    getAllMembers.mockResolvedValueOnce(expectedMembers);

    const req = { method: "GET" };

    await handle(req, res);

    // Fetches all members
    expect(getAllMembers).toHaveBeenCalledTimes(2);
    expect(getAllMembers).toHaveBeenCalledWith({ where: { featured: true } });
    expect(getAllMembers).toHaveBeenCalledWith({ where: { featured: false } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      featured: expectedFeatures,
      members: expectedMembers,
    });
  });

  it("responds with 500 when prisma query fails", async () => {
    getAllMembers.mockRejectedValueOnce(new Error("Test Error"));
    const req = { method: "GET" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});

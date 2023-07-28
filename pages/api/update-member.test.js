import { updateMember } from "../../helpers/prisma-helpers";
import handle from "./update-member";

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

// Mock the updateMember helper function
jest.mock("../../helpers/prisma-helpers", () => ({
  updateMember: jest.fn(),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe("/api/update-member", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 when request is valid", async () => {
    updateMember.mockResolvedValueOnce();
    const req = {
      method: "POST",
      body: { name: "Test User", avatar_url: "avatar.com/test" },
    };

    await handle(req, res);

    expect(updateMember).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it("responds with 400 when updateMember fails", async () => {
    updateMember.mockRejectedValueOnce(new Error("Update Error"));
    const req = { method: "POST" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });
});

import prisma from "../../lib/db";
import handle from "./initialise-admin-member";
import { getAllMembers } from "../../helpers/prisma-helpers";

// mock the Prisma client
jest.mock("../../lib/db", () => ({
  member: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  $disconnect: jest.fn(),
}));

jest.mock("../../helpers/prisma-helpers", () => ({
  getAllMembers: jest.fn(),
}));

const res = {
  // mockReturnThis() is used here to return the mock object itself as the
  // result of `.status`. This is because we chain methods in the code itself,
  // ie `res.status(409).send();`
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  json: jest.fn(),
};

describe("/api/initialise-admin-member", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 405 when request method is not POST", async () => {
    const req = { method: "GET" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.send).toHaveBeenCalled();
  });

  it("responds with 409 when there are already members", async () => {
    getAllMembers.mockResolvedValueOnce([
      { id: 1, email: "existing@member.com" },
    ]);
    const req = { method: "POST" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalled();
  });

  it("creates and responds with a member when request is valid", async () => {
    getAllMembers.mockResolvedValueOnce([]);
    prisma.member.create.mockResolvedValueOnce({
      id: 1,
      email: "root@user.com",
    });
    const req = {
      method: "POST",
      body: { name: "Root User", avatar_url: "avatar.com/root" },
    };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, email: "root@user.com" });
  });

  it("responds with 500 when prisma query fails", async () => {
    getAllMembers.mockRejectedValueOnce(new Error("Prisma Error"));
    const req = { method: "POST" };

    await handle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});

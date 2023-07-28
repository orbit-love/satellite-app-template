import { withAuthCheck, withMethodCheck } from "./api-helpers";

// ------------------------------------------------------
// Required when testing a route with withAuthCheck
jest.mock("../pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
}));

// We'll overwrite this mock in the individual test cases
jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));
// ------------------------------------------------------

let req, res, handler, getServerSessionMock;

beforeEach(() => {
  // Set up some mock middleware
  req = { method: "POST" };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  handler = jest.fn();

  // Reset the mock for getServerSession
  getServerSessionMock = require("next-auth/next").getServerSession;
  getServerSessionMock.mockClear();
});

describe("withAuthCheck", () => {
  it("calls the handler if the user is authenticated", async () => {
    // Mock a valid session
    getServerSessionMock.mockResolvedValue({
      user: { email: "test@test.com" },
    });

    const handlerWithAuthCheck = withAuthCheck(handler);
    await handlerWithAuthCheck(req, res);

    expect(handler).toBeCalledWith(req, res);
    expect(res.status).not.toBeCalled();
  });

  it("returns 401 if the user is not authenticated", async () => {
    // Mock no session
    getServerSessionMock.mockResolvedValue(null);

    const handlerWithAuthCheck = withAuthCheck(handler);
    await handlerWithAuthCheck(req, res);

    expect(handler).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      message: "Unauthorized. Please sign in before accessing this resource.",
    });
  });
});

describe("withMethodCheck", () => {
  it("calls the handler if the request method matches", () => {
    const handlerWithMethodCheck = withMethodCheck(handler);
    handlerWithMethodCheck(req, res);

    expect(handler).toBeCalledWith(req, res);
    expect(res.status).not.toBeCalled();
  });

  it("returns 405 if the request method does not match", () => {
    req.method = "GET";

    const handlerWithMethodCheck = withMethodCheck(handler);
    handlerWithMethodCheck(req, res);

    expect(handler).not.toBeCalled();
    expect(res.status).toBeCalledWith(405);
    expect(res.send).toBeCalledTimes(1);
  });
});

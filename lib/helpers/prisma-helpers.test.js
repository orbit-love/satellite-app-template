import prisma from "../db";
import { getAllMemberEmails } from "./prisma-helpers";

// mock the Prisma client
jest.mock("../db", () => ({
  member: {
    findMany: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("#getAllMemberEmails", () => {
  it("should return an array of just emails", async () => {
    const mockData = [
      { email: "test1@example.com" },
      { email: "test2@example.com" },
    ];

    prisma.member.findMany.mockResolvedValue(mockData);

    const result = await getAllMemberEmails();
    expect(result).toEqual(["test1@example.com", "test2@example.com"]);
  });
});

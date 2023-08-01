import prisma from "../lib/db";
import { getAllMemberEmails, getAllMembers } from "./prisma-helpers";

// mock the Prisma client
jest.mock("../lib/db", () => ({
  member: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("#getAllMembers", () => {
  it("should return all members with default ordering", async () => {
    const mockData = [{ name: "John Doe" }, { name: "Jane Doe" }];

    prisma.member.findMany.mockResolvedValue(mockData);

    const result = await getAllMembers();
    expect(result).toEqual(mockData);

    // Check that findMany was called with the default search queries
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    });
  });

  it("should merge the additional clause with the default search queries when provided", async () => {
    const mockData = [{ name: "John Doe" }, { name: "Jane Doe" }];

    prisma.member.findMany.mockResolvedValue(mockData);

    const additionalClause = { where: { shownInPublicDirectory: true } };
    const result = await getAllMembers(additionalClause);

    expect(result).toEqual(mockData);

    // Check that findMany was called with the merged object
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      ...additionalClause,
      orderBy: { name: "asc" },
    });
  });
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

    // Check that findMany was called with the default object
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      select: { email: true },
    });
  });

  it("should merge the additional clause with the default object when provided", async () => {
    const mockData = [
      { email: "test1@example.com" },
      { email: "test2@example.com" },
    ];

    prisma.member.findMany.mockResolvedValue(mockData);

    const additionalClause = { where: { shownInPublicDirectory: true } };
    const result = await getAllMemberEmails(additionalClause);

    expect(result).toEqual(["test1@example.com", "test2@example.com"]);

    // Check that findMany was called with the merged object
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      ...additionalClause,
      select: { email: true },
    });
  });
});

import prisma from "../lib/db";
import {
  getAllMemberEmails,
  getAllMembers,
  updateMember,
} from "./prisma-helpers";

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

describe("updateMember", () => {
  it("should filter out non-permitted params and update the member", async () => {
    const mockBody = {
      id: "1",
      bio: "New Bio",
      shownInDirectory: false,
      notPermittedParam: "Some value",
    };

    prisma.member.update.mockResolvedValue();

    await updateMember(mockBody);

    // Verify only permitted params included
    expect(prisma.member.update).toHaveBeenCalledWith({
      where: { id: parseInt(mockBody.id) },
      data: { bio: mockBody.bio, shownInDirectory: mockBody.shownInDirectory },
    });
  });

  it("should handle the error when updating the member fails", async () => {
    const mockBody = { id: "1", bio: "New Bio", shownInDirectory: true };

    prisma.member.update.mockRejectedValue(
      new Error("Failed to update member")
    );

    try {
      await updateMember(mockBody);
    } catch (error) {
      expect(error).toEqual(new Error("Failed to update member"));
    }
  });
});

describe("#getAllMembers", () => {
  it("should return all members with default ordering and included identities", async () => {
    const mockData = [
      { name: "John Doe", identities: [] },
      { name: "Jane Doe", identities: [] },
    ];

    prisma.member.findMany.mockResolvedValue(mockData);

    const result = await getAllMembers();
    expect(result).toEqual(mockData);

    // Check that findMany was called with the default search queries
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
      include: { identities: true },
    });
  });

  it("should merge the additional clause with the default search queries when provided", async () => {
    const mockData = [
      { name: "John Doe", identities: [] },
      { name: "Jane Doe", identities: [] },
    ];

    prisma.member.findMany.mockResolvedValue(mockData);

    const additionalClause = { where: { shownInPublicDirectory: true } };
    const result = await getAllMembers(additionalClause);

    expect(result).toEqual(mockData);

    // Check that findMany was called with the merged object
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      ...additionalClause,
      orderBy: { name: "asc" },
      include: { identities: true },
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

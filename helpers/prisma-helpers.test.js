import prisma from "../lib/db";
import { getAllMemberEmails, updateMember } from "./prisma-helpers";

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
      visible: false,
      notPermittedParam: "Some value",
    };

    prisma.member.update.mockResolvedValue();

    await updateMember(mockBody);

    // Verify only permitted params included
    expect(prisma.member.update).toHaveBeenCalledWith({
      where: { id: parseInt(mockBody.id) },
      data: { bio: mockBody.bio, visible: mockBody.visible },
    });
  });

  it("should handle the error when updating the member fails", async () => {
    const mockBody = { id: "1", bio: "New Bio", visible: true };

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

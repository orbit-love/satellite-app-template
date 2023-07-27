import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import AdminControls from "./admin-controls";

// Mocking useSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

const setMembers = jest.fn();

describe("AdminControls", () => {
  it("doesn't render for non-admin users", () => {
    useSession.mockReturnValueOnce({ data: { user: { admin: false } } });
    render(<AdminControls setMembers={setMembers} />);

    const adminControls = screen.queryByText("Admin Controls");
    const preamble = screen.queryByText(
      /This section is not shown to non-admin users. Use it to manage the data shown in this directory/i
    );

    expect(adminControls).not.toBeInTheDocument();
    expect(preamble).not.toBeInTheDocument();
  });

  it("renders for admin users", () => {
    useSession.mockReturnValueOnce({ data: { user: { admin: true } } });
    render(<AdminControls setMembers={setMembers} />);

    const adminControls = screen.getByText("Admin Controls");
    const preamble = screen.getByText(
      /This section is not shown to non-admin users. Use it to manage the data shown in this directory/i
    );

    expect(adminControls).toBeInTheDocument();
    expect(preamble).toBeInTheDocument();
  });
});

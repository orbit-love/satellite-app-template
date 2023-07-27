import { render, screen } from "@testing-library/react";
import MemberPreview from "./member-preview";

describe("MemberPreview", () => {
  const member = {
    id: "1",
    name: "Test Member",
    avatar_url: "http://testavatar.com",
  };

  it("renders member name correctly", () => {
    render(<MemberPreview member={member} />);
    const nameElement = screen.getByText(member.name);
    expect(nameElement).toBeInTheDocument();
  });

  it("renders member avatar correctly", () => {
    render(<MemberPreview member={member} />);
    const avatarElement = document.querySelector("img");
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.src).toContain("testavatar.com");
  });
});

import { render, fireEvent, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import MemberCard from "./member-card";

jest.mock("next-auth/react");

describe("MemberCard", () => {
  const member = {
    id: "1",
    name: "Test Member",
    avatar_url: "http://testavatar.com",
    bio: "Fake bio",
    identities: [
      {
        id: 1,
        type: "twitter_identity",
        profile_url: "https://www.google.com",
        username: "testTwitter",
      },
      {
        id: 2,
        type: "linkedin_identity",
        profile_url: "https://www.google.com",
        username: "testLinkedin",
      },
    ],
  };

  beforeEach(() => {
    useSession.mockReturnValueOnce({ data: { user: { name: "Test Member" } } });
  });

  it("renders image error when imageError is set and user is admin", () => {
    // Your implementation here
  });

  it("does not render image error when imageError is set and user is not admin", () => {
    // Your implementation here
  });

  it("renders a default square when no image URL is provided", () => {
    // Your implementation here
  });

  it("renders image when image URL is set correctly", () => {
    // Your implementation here
  });

  describe("rendering the main markup", () => {
    it("renders name", () => {
      render(<MemberCard member={member} />);

      const nameElement = screen.getByText(member.name);
      expect(nameElement).toBeInTheDocument();
    });

    it("renders member identities", () => {
      render(<MemberCard member={member} />);

      const twitterElement = screen.getByText("@testTwitter");
      expect(twitterElement).toBeInTheDocument();

      const linkedInElement = screen.getByText("@testLinkedin");
      expect(linkedInElement).toBeInTheDocument();
    });

    it("renders bio", () => {
      render(<MemberCard member={member} />);

      const bioElement = screen.getByText(member.bio);
      expect(bioElement).toBeInTheDocument();
    });

    it("renders edit button if editable", () => {
      render(<MemberCard member={member} editable />);

      const editElement = screen.getByText("Edit");
      expect(editElement).toBeInTheDocument();
    });

    it("does not render edit button if not editable", () => {
      render(<MemberCard member={member} />);

      const editElement = screen.queryByText("Edit");
      expect(editElement).toBeNull();
    });
  });

  it("should switch to edit state when clicking the edit button", () => {
    render(<MemberCard member={member} editable />);

    let saveElement = screen.queryByText("Save");
    let cancelElement = screen.queryByText("Cancel");

    expect(saveElement).toBeNull();
    expect(cancelElement).toBeNull();

    const editElement = screen.getByText("Edit");
    fireEvent.click(editElement);

    saveElement = screen.getByText("Save");
    cancelElement = screen.getByText("Cancel");

    expect(saveElement).toBeInTheDocument();
    expect(cancelElement).toBeInTheDocument();
  });
});

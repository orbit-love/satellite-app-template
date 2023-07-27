import { render, screen } from "@testing-library/react";
import IdentityLink from "./identity-link";

describe("IdentityLink", () => {
  const twitterIdentity = {
    id: 1,
    type: "twitter_identity",
    profile_url: "https://www.google.com/",
    username: "testTwitter",
  };

  const linkedinIdentity = {
    id: 1,
    type: "linkedin_identity",
    profile_url: "https://www.google.com/",
    username: "testLinkedin",
  };

  it("renders a light-theme & dark-theme logo for twitter identities", () => {
    render(<IdentityLink identity={twitterIdentity} />);

    const lightThemeLogo = document.querySelector("img.block");
    expect(lightThemeLogo).toBeInTheDocument();
    expect(lightThemeLogo.src).toContain("twitter-icon-blue");

    const darkThemeLogo = document.querySelector("img.hidden");
    expect(darkThemeLogo).toBeInTheDocument();
    expect(darkThemeLogo.src).toContain("twitter-icon-white");
  });

  it("renders a light-theme & dark-theme logo for linkedin identities", () => {
    render(<IdentityLink identity={linkedinIdentity} />);

    const lightThemeLogo = document.querySelector("img.block");
    expect(lightThemeLogo).toBeInTheDocument();
    expect(lightThemeLogo.src).toContain("linkedin-icon-blue");

    const darkThemeLogo = document.querySelector("img.hidden");
    expect(darkThemeLogo).toBeInTheDocument();
    expect(darkThemeLogo.src).toContain("linkedin-icon-white");
  });

  it("renders a username", () => {
    render(<IdentityLink identity={linkedinIdentity} />);

    const usernameElement = screen.getByText(`@${linkedinIdentity.username}`);
    expect(usernameElement).toBeInTheDocument();
  });

  it("renders a link to the identity", () => {
    render(<IdentityLink identity={linkedinIdentity} />);

    const linkElement = document.querySelector("a");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toEqual(linkedinIdentity.profile_url);
  });
});

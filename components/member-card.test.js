import { render, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import MemberCard from "./member-card";

jest.mock("next-auth/react");

describe("MemberCard", () => {
  it("should render image error when imageError is set and user is admin", () => {
    // Your implementation here
  });

  it("should not render image error when imageError is set and user is not admin", () => {
    // Your implementation here
  });

  it("should render a default square when no image URL is provided", () => {
    // Your implementation here
  });

  it("should render image when image URL is set correctly", () => {
    // Your implementation here
  });

  it("should render edit state component when in edit state", () => {
    // Your implementation here
  });

  it("should render main markup of the component", () => {
    // Your implementation here
  });

  describe("Main markup", () => {
    it("should render name", () => {
      // Your implementation here
    });

    it("should render success message", () => {
      // Your implementation here
    });

    it("should render member identities", () => {
      // Your implementation here
    });

    it("should render bio", () => {
      // Your implementation here
    });

    it("should render edit button", () => {
      // Your implementation here
    });
  });

  it("should switch to edit state when clicking the edit button", () => {
    // Your implementation here
  });
});

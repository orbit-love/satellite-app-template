import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RevokeAccess from "./revoke-access";
import { signOut } from "next-auth/react";

// Mocking fetch and signOut
global.fetch = jest.fn();
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signOut: jest.fn(),
}));

const id = 1;
const setError = jest.fn();

describe("RevokeAccess", () => {
  // Reset the fetch and signOut mocks before each test
  beforeEach(() => {
    fetch.mockClear();
    signOut.mockClear();
  });

  it("renders component UI", () => {
    render(<RevokeAccess id={id} setError={setError} />);

    const title = screen.getByText("Revoke Access");
    const preamble = screen.getByText(
      "This will remove your profile from this directory, and consequently prevent you from accessing the directory in the future."
    );

    expect(title).toBeInTheDocument();
    expect(preamble).toBeInTheDocument();
  });

  it("disables submit button when checkbox is not checked", () => {
    render(<RevokeAccess id={id} setError={setError} />);

    const submit = document.querySelector("button");

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);

    fireEvent.click(submit);

    expect(fetch).not.toHaveBeenCalled();
  });

  it("enables submit button when checkbox is checked", () => {
    render(<RevokeAccess id={id} setError={setError} />);

    const submit = document.querySelector("button");
    const check = document.querySelector("#confirm");

    expect(submit).toBeInTheDocument();
    expect(check).toBeInTheDocument();

    expect(submit.disabled).toBe(true);

    fireEvent.click(check);

    expect(submit.disabled).toBe(false);
  });

  it("submits the form with the correct parameters when checkbox is checked", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(<RevokeAccess id={id} setError={setError} />);

    const submit = document.querySelector("button");
    const check = document.querySelector("#confirm");

    fireEvent.click(check);
    fireEvent.click(submit);

    expect(fetch).toHaveBeenCalledWith("/api/revoke-access-for-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, shownInDirectory: false }),
    });

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/auth/goodbye" });
      expect(setError).not.toHaveBeenCalled();
    });
  });

  it("calls setError on failed response", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<RevokeAccess id={id} setError={setError} />);

    const submit = document.querySelector("button");
    const check = document.querySelector("#confirm");

    fireEvent.click(check);
    fireEvent.click(submit);

    expect(fetch).toHaveBeenCalledWith("/api/revoke-access-for-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, shownInDirectory: false }),
    });

    await waitFor(() => {
      expect(signOut).not.toHaveBeenCalled();
      expect(setError).toHaveBeenCalledWith(
        "Something went wrong! Please try again or contact your community manager who will be able to manually remove you."
      );
    });
  });
});

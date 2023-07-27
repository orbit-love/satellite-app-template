import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./form";

global.fetch = jest.fn();

const setEditState = jest.fn();
const setError = jest.fn();
const setSuccess = jest.fn();

const member = {
  id: "1",
  bio: "Test Bio",
  shownInPublicDirectory: true,
};

// Reset the fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
});

describe("Form", () => {
  it("initializes fields with member data", () => {
    render(
      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const bio = screen.getByLabelText("Bio");
    const check = screen.getByLabelText("Show in public directory");

    expect(bio.value).toBe(member.bio);
    expect(check.checked).toBe(member.shownInPublicDirectory);
  });

  it("updates state when inputs are changed", () => {
    render(
      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const bio = screen.getByLabelText("Bio");
    const check = screen.getByLabelText("Show in public directory");

    fireEvent.change(bio, {
      target: { value: "New Bio" },
    });
    fireEvent.click(check);

    expect(bio.value).toBe("New Bio");
    expect(check.checked).toBe(!member.shownInPublicDirectory);
  });

  it("makes a request when the form is submitted", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(
      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const save = screen.getByRole("button", { name: /Save/i });

    fireEvent.click(save);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/update-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: member.id,
          bio: member.bio,
          shownInPublicDirectory: member.shownInPublicDirectory,
        }),
      });

      expect(setEditState).toHaveBeenCalledWith(false);
      expect(setError).toHaveBeenCalledWith("");
      expect(setSuccess).toHaveBeenCalledWith(
        "Updated. You are shown in the public directory."
      );
    });
  });

  it("displays bio too long errors on failed request", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    render(
      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(setSuccess).toHaveBeenCalledWith("");
      expect(setError).toHaveBeenCalledWith(
        "Please ensure your bio is fewer than 175 characters."
      );
    });
  });

  it("displays generic errors on failed request", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(
      <Form
        setEditState={setEditState}
        member={member}
        setError={setError}
        setSuccess={setSuccess}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(setSuccess).toHaveBeenCalledWith("");
      expect(setError).toHaveBeenCalledWith("Something went wrong!");
    });
  });
});

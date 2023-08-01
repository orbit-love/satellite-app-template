import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminForm from "./admin-form";
import { useSession } from "next-auth/react";

global.fetch = jest.fn();

const setEditState = jest.fn();
const setError = jest.fn();
const setSuccess = jest.fn();

jest.mock("next-auth/react");

const member = {
  id: "1",
  featured: true,
};

// Reset the fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
  useSession.mockClear();
});

describe("AdminForm", () => {
  it("renders nothing when not an admin", () => {});

  describe("when an admin", () => {
    beforeAll(() => {
      useSession.mockReturnValue({
        data: { user: { name: "Test Member", admin: true } },
      });
    });

    it("initializes fields with member data", () => {
      render(
        <AdminForm
          setEditState={setEditState}
          member={member}
          setError={setError}
          setSuccess={setSuccess}
        />
      );

      const featured = screen.getByLabelText("Featured");
      expect(featured.checked).toBe(member.featured);
    });

    it("updates state when inputs are changed", () => {
      render(
        <AdminForm
          setEditState={setEditState}
          member={member}
          setError={setError}
          setSuccess={setSuccess}
        />
      );

      const featured = screen.getByLabelText("Featured");

      fireEvent.click(featured);

      expect(featured.checked).toBe(!member.featured);
    });

    it("makes a request when the form is submitted", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
      });

      render(
        <AdminForm
          setEditState={setEditState}
          member={member}
          setError={setError}
          setSuccess={setSuccess}
        />
      );

      const save = screen.getByRole("button", { name: /Save/i });

      fireEvent.click(save);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/admin-update-member", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: member.id,
            featured: member.featured,
          }),
        });

        expect(setEditState).toHaveBeenCalledWith(false);
        expect(setError).toHaveBeenCalledWith("");
        expect(setSuccess).toHaveBeenCalledWith(
          "Updated. Member is now featured. Please refresh to see changes."
        );
      });
    });

    it("displays generic errors on failed request", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      render(
        <AdminForm
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
});

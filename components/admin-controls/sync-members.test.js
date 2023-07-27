import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SyncMembers from "./sync-members";

// Mocking fetch
global.fetch = jest.fn();

const setMembers = jest.fn();
const setError = jest.fn();
const setSuccess = jest.fn();

// Reset the fetch mock before each test
beforeEach(() => {
  fetch.mockClear();
});

describe("SyncMembers", () => {
  it("renders component UI", () => {
    render(
      <SyncMembers
        setMembers={setMembers}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const syncMembersButton = screen.getByText("Sync Members");
    const explanationText = screen.getByText(
      /This will fetch the latest data from Orbit to update this list./i
    );

    expect(syncMembersButton).toBeInTheDocument();
    expect(explanationText).toBeInTheDocument();
  });

  it("calls the API on button click and handles a successful response", async () => {
    const mockMembers = [
      { id: 1, name: "Test Member 1" },
      { id: 2, name: "Test Member 2" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ members: mockMembers }),
    });

    render(
      <SyncMembers
        setMembers={setMembers}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const syncMembersButton = screen.getByText("Sync Members");
    fireEvent.click(syncMembersButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/populate-members-table", {
        method: "POST",
      });

      expect(setMembers).toHaveBeenCalledWith(mockMembers);
      expect(setError).toHaveBeenCalledWith("");
      expect(setSuccess).toHaveBeenCalledWith("Members synced successfully.");
    });
  });

  it("handles an unsuccessful response by calling setError with the correct message", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <SyncMembers
        setMembers={setMembers}
        setError={setError}
        setSuccess={setSuccess}
      />
    );

    const syncMembersButton = screen.getByText("Sync Members");
    fireEvent.click(syncMembersButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/populate-members-table", {
        method: "POST",
      });

      expect(setError).toHaveBeenCalledWith(
        "Something went wrong with the Sync Members action. Please verify your workspace slug & API key are set correctly in the environment variables & try again."
      );
      expect(setSuccess).toHaveBeenCalledWith("");
    });
  });
});

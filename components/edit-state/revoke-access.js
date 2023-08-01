import { signOut } from "next-auth/react";
import { useState } from "react";

export default function RevokeAccess({ id, setError }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    if (!isConfirmed) return;

    const response = await fetch("/api/update-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, shownInDirectory: false }),
    });

    if (response.ok) {
      // On successful response, redirect to goodbye page
      signOut({ callbackUrl: "/auth/goodbye" });
    } else {
      // On error....
      setError(
        "Something went wrong! Please try again or contact your community manager who will be able to manually remove you."
      );
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input name="id" type="hidden" defaultValue={id} />

      <label
        htmlFor="bio"
        className="text-brand-dark dark:text-brand-light tracking-tight leading-8"
      >
        Revoke Access
      </label>

      <small className="text-brand-dark-highlight dark:text-brand-light-highlight block mb-2">
        This will remove your profile from this directory, and consequently
        prevent you from accessing the directory in the future.
      </small>

      <div className="flex relative items-start mb-6">
        <div className="flex items-center h-6">
          <input
            name="confirm"
            id="confirm"
            type="checkbox"
            className="text-brand-accent border-brand-light-highlight focus:ring-brand-accent w-4 h-4 rounded"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
        </div>

        <label
          htmlFor="confirm"
          className="text-brand-dark dark:text-brand-light ml-3 leading-6"
        >
          I understand this will remove my listing & revoke my access to this
          directory
        </label>
      </div>

      <button
        type="submit"
        disabled={!isConfirmed}
        className="focus-visible:outline-brand-light inline-block flex-none py-2.5 px-3 w-full text-white bg-red-700 rounded-md shadow-sm hover:bg-red-800 focus:bg-red-800 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-40"
      >
        Remove yourself from directory
      </button>
    </form>
  );
}

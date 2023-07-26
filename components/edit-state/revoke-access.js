import { signOut } from "next-auth/react";
import { useState } from "react";

export default function RevokeAccess({ id, setError }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    if (!isConfirmed) return;

    const response = await fetch("/api/revoke-access-for-member", {
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
        className="tracking-tight leading-8 text-brand-dark dark:text-brand-light"
      >
        Revoke Access
      </label>

      <small className="block mb-2 text-brand-dark-highlight dark:text-brand-light-highlight">
        This will remove your profile from this directory, and consequently
        prevent you from accessing the directory in the future.
      </small>

      <div className="flex relative items-start mb-6">
        <div className="flex items-center h-6">
          <input
            name="confirm"
            id="confirm"
            type="checkbox"
            className="w-4 h-4 text-brand-accent rounded border-brand-light-highlight focus:ring-brand-accent"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
        </div>
        <label
          htmlFor="confirm"
          className="ml-3 leading-6 text-brand-dark dark:text-brand-light"
        >
          I understand this will remove my listing & revoke my access to this
          directory
        </label>
      </div>

      <button
        type="submit"
        disabled={!isConfirmed}
        className="inline-block flex-none py-2.5 px-3 w-full text-brand-light bg-red-700 rounded-md shadow-sm hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline focus-visible:outline-offset-2 disabled:bg-red-800"
      >
        Remove yourself from directory
      </button>
    </form>
  );
}

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminControls({ setMembers }) {
  const { data: session } = useSession();
  const [error, setError] = useState("");

  async function refreshMembers() {
    const res = await fetch("/api/populate-members-table", { method: "POST" });

    if (res.ok) {
      const data = await res.json();

      setMembers(data.members);
      setError("");
    } else {
      setError(
        "Something went wrong with the Sync Members action. Please verify your workspace slug & API key are set correctly in the environment variables & try again."
      );
    }
  }

  if (!session?.user.admin) return;

  return (
    <section className="py-4 px-6 mt-20 rounded border border-gray-300 dark:border-gray-100">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
        Admin Controls
      </h2>

      <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
        This section is not shown to non-admin users. Use it to manage the data
        shown in this directory
      </p>

      <ul className="mt-3">
        <li className="flex inline-flex flex-col gap-4 items-center md:flex-row">
          <button
            className="py-2 px-3 min-w-fit text-base font-semibold text-white bg-purple-500 rounded-md shadow-sm hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-purple-600 focus-visible:outline focus-visible:outline-offset-2"
            onClick={refreshMembers}
          >
            Sync Members
          </button>

          <p className="text-gray-900 dark:text-white">
            This will fetch the latest data from Orbit to update this list. Use
            it if you want to refresh which members appear in the directory.
            This can also be triggered by sending a POST request to{" "}
            <code className="">/api/populate-members-table</code>
          </p>
        </li>
      </ul>

      {!!error ? (
        <section className="flex p-4 mt-3 bg-red-50 rounded-md" role="alert">
          {/* x icon SVG */}
          <svg
            className="flex-shrink-0 w-5 h-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>

          <h3 className="ml-3 text-sm font-medium text-red-800">{error}</h3>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}

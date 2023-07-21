import { useSession } from "next-auth/react";
import { useState } from "react";
import Error from "./error";

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
    <section className="py-4 px-6 mt-20 mx-auto max-w-6xl rounded border border-gray-300 dark:border-gray-100">
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

      {!!error ? <Error message={error} /> : ""}
    </section>
  );
}

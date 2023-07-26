import { useState } from "react";

export default function SyncMembers({ setMembers, setError, setSuccess }) {
  const [isBusy, setIsBusy] = useState(false);

  async function refreshMembers() {
    setIsBusy(true);
    const res = await fetch("/api/populate-members-table", { method: "POST" });

    if (res.ok) {
      const data = await res.json();

      setMembers(data.members);
      setError("");
      setSuccess("Members synced successfully.");
    } else {
      setError(
        "Something went wrong with the Sync Members action. Please verify your workspace slug & API key are set correctly in the environment variables & try again."
      );
      setSuccess("");
    }

    setIsBusy(false);
  }

  return (
    <li className="flex inline-flex flex-col gap-4 items-center md:flex-row">
      <button
        className="py-2 px-3 min-w-fit text-base font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-green-700 focus-visible:outline focus-visible:outline-offset-2 disabled:bg-green-900"
        onClick={refreshMembers}
        disabled={isBusy}
      >
        Sync Members
      </button>

      <p className="dark:text-brand-light text-brand-dark">
        This will fetch the latest data from Orbit to update this list. Use it
        if you want to refresh which members appear in the directory. This can
        also be triggered by sending a POST request to{" "}
        <code className="">/api/populate-members-table</code>
      </p>
    </li>
  );
}

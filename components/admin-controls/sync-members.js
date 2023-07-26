export default function SyncMembers({ setMembers, setError }) {
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

  return (
    <li className="flex inline-flex flex-col gap-4 items-center md:flex-row">
      <button
        className="bg-brand-accent hover:bg-brand-accent-highlight focus-visible:outline-brand-accent-highlight py-2 px-3 min-w-fit text-base font-semibold text-white rounded-md shadow-sm focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2"
        onClick={refreshMembers}
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

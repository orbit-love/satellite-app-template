import { useSession } from "next-auth/react";
import { useState } from "react";
import Error from "../flashes/error";
import SyncMembers from "./sync-members";
import Success from "../flashes/success";

export default function AdminControls({ setMembers }) {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!session?.user.admin) return;

  return (
    <section className="border-brand-dark dark:border-brand-light py-4 px-6 mt-20 mx-auto max-w-6xl rounded border">
      <h2 className="dark:text-brand-light text-brand-dark text-xl font-bold tracking-tight sm:text-2xl">
        Admin Controls
      </h2>

      <p className="text-brand-dark-highlight dark:text-brand-light-highlight mt-3 text-lg leading-8">
        This section is not shown to non-admin users. Use it to manage the data
        shown in this directory
      </p>

      <ul className="mt-3">
        <SyncMembers
          setMembers={setMembers}
          setError={setError}
          setSuccess={setSuccess}
        />
      </ul>

      {!!error ? <Error message={error} /> : ""}
      {!!success ? <Success message={success} /> : ""}
    </section>
  );
}

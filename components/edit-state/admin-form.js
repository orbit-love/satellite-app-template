import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminForm({
  setEditState,
  member,
  setError,
  setSuccess,
}) {
  const [featured, setFeatured] = useState(member.featured);

  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    let body = { id: member.id, featured: featured };

    const response = await fetch("/api/admin-update-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      setError("");
      setSuccess(
        `Updated. Member is ${
          featured ? "now featured" : "no longer featured"
        }. Please refresh to see changes.`
      );

      // Setting this won't update the UI (since we fetch) featured &
      // members separately, but it will ensure the form state remains
      // consistent in case the user exits and re-enters the form before
      // refreshing
      member.featured = featured;

      setEditState(false);
    } else {
      setSuccess("");
      setError("Something went wrong!");
    }
  };

  if (!session?.user.admin) return;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h2 className="text-brand-dark dark:text-brand-light mt-6 text-xl font-semibold tracking-tight leading-8">
        Admin-Only Changes
      </h2>

      <input name="id" type="hidden" defaultValue={member.id} />

      {/* ---------- Feature member field ---------- */}
      <p className="text-brand-dark dark:text-brand-light tracking-tight leading-8">
        Feature Member
      </p>

      <small className="text-brand-dark-highlight dark:text-brand-light-highlight block mb-2">
        This will feature this member & give them priority over other members in
        the directory.
      </small>

      <div className="flex relative items-start mb-6">
        <div className="flex justify-center items-center h-6">
          <input
            name="featured"
            id="featured"
            type="checkbox"
            className="text-brand-accent border-brand-light-highlight focus:ring-brand-accent w-4 h-4 rounded"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>
        <label
          htmlFor="featured"
          className="text-brand-dark dark:text-brand-light ml-3 leading-6"
        >
          Featured
        </label>
      </div>

      {/* Rendering buttons with flex-row-reverse so "submit" comes up first for screenreaders */}
      <section className="inline-flex flex-row-reverse gap-2 w-full">
        <button
          type="submit"
          className="bg-brand-accent hover:bg-brand-accent-highlight focus-visible:outline-brand-light inline-block flex-none py-2.5 px-3 text-white rounded-md shadow-sm focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2"
        >
          Save
        </button>

        <button
          onClick={() => setEditState(false)}
          className="focus-visible:outline-brand-light inline-block flex-none py-2.5 px-3 text-gray-900 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2 dark:bg-gray-200"
        >
          Cancel
        </button>
      </section>
    </form>
  );
}

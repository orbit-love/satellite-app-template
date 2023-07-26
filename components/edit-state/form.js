import { useState } from "react";

export default function Form({ setEditState, member, setError }) {
  const [bio, setBio] = useState(member.bio || "");
  const [shownInPublicDirectory, setShownInPublicDirectory] = useState(
    member.shownInPublicDirectory
  );

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    const response = await fetch("/api/update-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: member.id, bio, shownInPublicDirectory }),
    });

    if (response.ok) {
      // On successful response, return to default view
      // We manually set the updated fields so they update
      // "automatically" once returning to the default view
      member.bio = bio;
      member.shownInPublicDirectory = shownInPublicDirectory;
      setEditState(false);
      setError("");
    } else {
      if (response.status === 400) {
        setError("Please ensure your bio is fewer than 175 characters.");
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input name="id" type="hidden" defaultValue={member.id} />

      {/* ---------- Edit bio field ---------- */}
      <label
        htmlFor="bio"
        className="text-brand-dark dark:text-brand-light tracking-tight leading-8"
      >
        Bio
      </label>

      <small className="text-brand-dark-highlight dark:text-brand-light-highlight block mb-2">
        A short introduction about yourself. This will only be shown to other
        members on the directory
      </small>

      <textarea
        rows="4"
        name="bio"
        id="bio"
        className="text-brand-dark ring-brand-light-highlight block py-1.5 px-2 mb-2 w-full rounded-md border-0 ring-1 ring-inset shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="Hi, I'm Delete..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>

      {/* ---------- Show in public directory field ---------- */}
      <p className="text-brand-dark dark:text-brand-light tracking-tight leading-8">
        Public directory listing
      </p>

      <small className="text-brand-dark-highlight dark:text-brand-light-highlight block mb-2">
        This will show your name & profile picture on the public-facing page of
        this directory. You can revoke access to this at any time by unchecking
        this & hitting "Save".
      </small>

      <div className="flex relative items-start mb-6">
        <div className="flex justify-center items-center h-6">
          <input
            name="shownInPublicDirectory"
            id="shownInPublicDirectory"
            type="checkbox"
            className="text-brand-accent border-brand-light-highlight focus:ring-brand-accent w-4 h-4 rounded"
            checked={shownInPublicDirectory}
            onChange={(e) => setShownInPublicDirectory(e.target.checked)}
          />
        </div>
        <label
          htmlFor="shownInPublicDirectory"
          className="text-brand-dark dark:text-brand-light ml-3 leading-6"
        >
          Show in public directory
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

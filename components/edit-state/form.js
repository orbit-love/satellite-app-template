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
        className="tracking-tight leading-8 text-gray-900 dark:text-white"
      >
        Bio
      </label>

      <small className="block mb-2 text-gray-700 dark:text-gray-300">
        A short introduction about yourself. This will only be shown to other
        members on the directory
      </small>

      <textarea
        rows="4"
        name="bio"
        id="bio"
        className="block py-1.5 px-2 mb-2 w-full text-gray-900 rounded-md border-0 ring-1 ring-inset ring-gray-300 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="Hi, I'm Delete..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>

      {/* ---------- Show in public directory field ---------- */}
      <p className="tracking-tight leading-8 text-gray-900 dark:text-white">
        Public directory listing
      </p>

      <small className="block mb-2 text-gray-700 dark:text-gray-300">
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
            className="w-4 h-4 text-purple-500 rounded border-gray-300 focus:ring-purple-500"
            checked={shownInPublicDirectory}
            onChange={(e) => setShownInPublicDirectory(e.target.checked)}
          />
        </div>
        <label
          htmlFor="shownInPublicDirectory"
          className="ml-3 leading-6 text-gray-900 dark:text-white"
        >
          Show in public directory
        </label>
      </div>

      {/* Rendering buttons with flex-row-reverse so "submit" comes up first for screenreaders */}
      <section className="inline-flex flex-row-reverse gap-2 w-full">
        <button
          type="submit"
          className="inline-block flex-none py-2.5 px-3 text-white bg-purple-500 rounded-md shadow-sm hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
        >
          Save
        </button>

        <button
          onClick={() => setEditState(false)}
          className="inline-block flex-none py-2.5 px-3 text-gray-900 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
        >
          Cancel
        </button>
      </section>
    </form>
  );
}

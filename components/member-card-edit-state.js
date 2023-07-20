import { useState } from "react";
import Error from "./error";

export default function MemberCardEditState({ setEditState, member }) {
  const [bio, setBio] = useState(member.bio);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    const response = await fetch("/api/update-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: member.id, bio }),
    });

    if (response.ok) {
      // On successful response, set bio to new value & return to default view
      member.bio = bio;
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
    <div className="flex-auto">
      <form method="post" onSubmit={handleSubmit}>
        <input name="id" type="hidden" defaultValue={member.id} />

        <label
          htmlFor="bio"
          className="text-xl font-semibold tracking-tight leading-8 text-gray-900 dark:text-white"
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

        {!!error ? <Error message={error} /> : ""}

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
    </div>
  );
}

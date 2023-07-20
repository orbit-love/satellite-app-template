export default function MemberCardEditState({ setEditState }) {
  return (
    <div className="flex-auto">
      <form method="post" action="/api/update-member">
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
        ></textarea>

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

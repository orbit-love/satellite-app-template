export default function RevokeAccess({ setError }) {
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior so we don't redirect
    event.preventDefault();

    const response = await fetch("/api/update-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      // On successful response, redirect to goodbye page
    } else {
      // On error....
      setError(
        "Something went wrong! Please try again or contact your community manager who will be able to manually remove you."
      );
    }
  };

  return (
    <section>
      <button
        onClick={handleSubmit}
        className="inline-block flex-none py-2.5 px-3 mt-6 w-full text-white bg-red-700 rounded-md shadow-sm hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
      >
        Remove yourself from directory
      </button>

      <small className="block mb-2 text-gray-700 dark:text-gray-300">
        This will remove your profile from this directory, and consequently
        prevent you from accessing the directory in the future.
      </small>
    </section>
  );
}

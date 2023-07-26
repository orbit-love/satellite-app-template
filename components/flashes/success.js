export default function Success({ message }) {
  return (
    <section className="flex p-4 my-3 bg-green-50 rounded-md" role="alert">
      {/* tick icon SVG */}
      <svg
        class="w-5 h-5 text-green-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>

      <h3 className="ml-3 text-sm font-medium text-green-800">{message}</h3>
    </section>
  );
}

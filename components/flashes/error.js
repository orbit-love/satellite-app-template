export default function Error({ message }) {
  return (
    <section className="flex p-4 my-3 bg-red-50 rounded-md" role="alert">
      {/* x icon SVG */}
      <svg
        className="flex-shrink-0 w-5 h-5 text-red-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>

      <h3 className="ml-3 text-sm font-medium text-red-800">{message}</h3>
    </section>
  );
}

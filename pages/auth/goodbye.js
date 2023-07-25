import LayoutUnauthenticated from "../../components/layout-unauthenticated";

export default function VerifyRequest() {
  return (
    <LayoutUnauthenticated>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
        Goodbye!
      </h1>

      <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200">
        Sorry to see you go. You've been removed from this directory & will no
        longer be able to sign in. If you change your mind, contact your
        community manager who will be able to re-add you!
      </p>
    </LayoutUnauthenticated>
  );
}

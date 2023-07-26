import LayoutUnauthenticated from "../../components/layout-unauthenticated";

export default function VerifyRequest() {
  return (
    <LayoutUnauthenticated>
      <div className="isolate relative px-6 py-48 mx-auto max-w-2xl text-center lg:px-8 lg:py-64">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl dark:text-brand-light">
          Goodbye!
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200">
          Sorry to see you go. You've been removed from this directory & will no
          longer be able to sign in. If you change your mind, contact your
          community manager who will be able to re-add you!
        </p>
      </div>
    </LayoutUnauthenticated>
  );
}

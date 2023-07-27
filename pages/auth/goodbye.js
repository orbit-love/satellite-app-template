import LayoutUnauthenticated from "../../components/layout-unauthenticated";

export default function VerifyRequest() {
  return (
    <LayoutUnauthenticated>
      <div className="isolate relative px-6 mx-auto max-w-2xl text-center lg:px-8">
        <h1 className="text-brand-dark dark:text-brand-light text-4xl font-bold tracking-tight sm:text-6xl">
          Goodbye!
        </h1>

        <p className="text-brand-dark-highlight dark:text-brand-light-highlight mt-6 text-xl leading-8">
          Sorry to see you go. You've been removed from this directory & will no
          longer be able to sign in. If you change your mind, contact your
          community manager who will be able to re-add you!
        </p>
      </div>
    </LayoutUnauthenticated>
  );
}

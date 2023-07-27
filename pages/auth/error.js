import Link from "next/link";
import LayoutUnauthenticated from "../../components/layout-unauthenticated";
import { useRouter } from "next/router";

export default function VerifyRequest() {
  // Fetch error code from query params
  const router = useRouter();
  const { error } = router.query;

  // If member shouldn't have access to the repository, show
  // them the same screen as if they had signed in successfully
  // - this is so we don't expose which emails are listed on the directory
  // Handled serverside by pages/api/auth/[...nextauth].js#signIn method,
  // this just helps if someone manually visits this page
  if (error === "AccessDenied") {
    router.replace("/auth/verify-request");
  }

  let title, preamble;

  // Set relevant error message for each of the error types listed in
  // https://next-auth.js.org/configuration/pages#error-page
  switch (error) {
    case "Verification":
      title = "Invalid link";
      preamble =
        "That link has expired or has already been used. Please sign in again to receive a new one.";
      break;
    case "Configuration":
      title = "Server Error";
      preamble = `There's something wrong with the server configuration.
        Ensure you have set environment variables correctly & try again.`;
      break;
    // Whilst error is being fetched, don't show anything - this is so we don't flash
    // the default error for about a frame before choosing which one to show
    case undefined:
      return;
    default:
      title = "Something went wrong";
      preamble =
        "Please try again later. If the issue persists, reach out to your community manager.";
      break;
  }

  return (
    <LayoutUnauthenticated>
      {router.isReady ? (
        <div className="isolate relative px-6 py-48 mx-auto max-w-2xl text-center lg:px-8 lg:py-64">
          <h1 className="text-brand-dark dark:text-brand-light text-4xl font-bold tracking-tight sm:text-6xl">
            {title}
          </h1>

          <p className="text-brand-dark-highlight dark:text-brand-light-highlight mt-6 text-xl leading-8">
            {preamble}
          </p>

          <Link
            href="/auth/sign-in"
            className="text-brand-light bg-brand-accent hover:bg-brand-accent-highlight focus:bg-brand-accent-highlight focus-visible:outline-brand-light inline-block flex-none py-3.5 px-5 mt-6 text-lg font-semibold rounded-md shadow-sm focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2"
          >
            Back to login
          </Link>
        </div>
      ) : (
        ""
      )}
    </LayoutUnauthenticated>
  );
}

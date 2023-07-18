import Link from "next/link";
import AuthLayout from "./auth-layout";
import { useRouter } from "next/router";

export default function VerifyRequest() {
  // Fetch error code from query params
  const router = useRouter();
  const { error } = router.query;

  let title, preamble;

  // Set relevant error message for each of the error types listed in
  // https://next-auth.js.org/configuration/pages#error-page
  switch (error) {
    case "AccessDenied":
      title = "Access denied";
      preamble = `You don't have access to this directory.
        If you believe this is an error, please contact your
        community manager who will be able to resolve this.`;
      break;
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
    default:
      title = "Something went wrong";
      preamble =
        "Please try again later. If the issue persists, reach out to your community manager.";
      break;
  }

  return (
    <AuthLayout>
      {router.isReady ? (
        <div className="isolate relative px-6 py-32 mt-14 mx-auto max-w-2xl text-center sm:py-48 lg:px-8 lg:py-56">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-600">{preamble}</p>

          <Link
            href="/auth/sign-in"
            className="flex-none py-3.5 px-5 mt-6 text-lg font-semibold text-white bg-purple-500 rounded-md shadow-sm hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
          >
            Back to login
          </Link>
        </div>
      ) : (
        ""
      )}
    </AuthLayout>
  );
}
import AuthLayout from "./auth-layout";

export default function VerifyRequest() {
  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
        You're in!
      </h1>

      <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200">
        We've just dispatched an email to your inbox containing a verification
        link. Click on that link to complete your sign-in process.
      </p>
    </AuthLayout>
  );
}

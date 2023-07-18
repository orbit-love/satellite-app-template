import AuthLayout from "./auth-layout";

export default function VerifyRequest() {
  return (
    <AuthLayout>
      <div className="isolate relative px-6 py-32 mt-14 mx-auto max-w-2xl text-center sm:py-48 lg:px-8 lg:py-56">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          You're in!
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600">
          We've just dispatched an email to your inbox containing a verification
          link. Click on that link to complete your sign-in process.
        </p>
      </div>
    </AuthLayout>
  );
}

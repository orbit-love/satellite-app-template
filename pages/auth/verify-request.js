import AuthLayout from "./auth-layout";

export default function VerifyRequest() {
  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
        Thanks!
      </h1>

      <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200">
        If your details are listed in this directory, we've just sent you an
        email with a verification link. Click on that link to complete your
        sign-in process. If you can't access the directory, but believe you
        should be in it, kindly reach out to your community manager for
        assistance. They can help get you added.
      </p>
    </AuthLayout>
  );
}

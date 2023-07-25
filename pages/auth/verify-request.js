import LayoutUnauthenticated from "../../components/layout-unauthenticated";

export default function VerifyRequest() {
  return (
    <LayoutUnauthenticated>
      <div className="isolate relative px-6 py-48 mx-auto max-w-2xl text-center lg:px-8 lg:py-64">
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
      </div>
    </LayoutUnauthenticated>
  );
}

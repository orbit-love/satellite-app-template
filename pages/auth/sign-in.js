import { getCsrfToken } from "next-auth/react";
import LayoutUnauthenticated from "../../components/layout-unauthenticated";

export default function SignIn({ csrfToken }) {
  return (
    <LayoutUnauthenticated>
      <div className="isolate relative px-6 py-48 mx-auto max-w-2xl text-center lg:px-8 lg:py-64">
        <h1 className="dark:text-brand-light text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
          Member Directory
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-200">
          Welcome to the Member Directory! This platform serves as a hub for
          connecting with your fellow community members. Sign in to explore
          profiles, discover common interests, and engage more actively with
          your fellow community members.
        </p>

        <form
          className="flex gap-x-4 mt-10 mx-auto max-w-lg"
          method="post"
          action="/api/auth/signin/email"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="ring-white/10 flex-auto py-3.5 px-5 min-w-0 text-lg text-brand-dark bg-white rounded-md border border-gray-100 ring-1 ring-inset shadow-sm focus:ring-2 focus:ring-inset focus:ring-white sm:leading-6"
            placeholder="Enter your email"
          />

          <button
            type="submit"
            className="text-brand-light bg-brand-accent hover:bg-brand-accent-highlight focus-visible:outline-brand-light inline-block flex-none py-3.5 px-5 text-lg font-semibold rounded-md shadow-sm focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-2"
          >
            Sign in with Email
          </button>
        </form>
      </div>
    </LayoutUnauthenticated>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

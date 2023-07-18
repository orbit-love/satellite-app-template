import { getCsrfToken } from "next-auth/react";
import AuthLayout from "./auth-layout";

export default function SignIn({ csrfToken }) {
  return (
    <AuthLayout>
      <div class="isolate relative px-6 py-32 mt-14 mx-auto max-w-2xl text-center sm:py-48 lg:px-8 lg:py-56">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Member Directory
        </h1>

        <p class="mt-6 text-lg leading-8 text-gray-600">
          Welcome to the Member Directory! This platform serves as a hub for
          connecting with your fellow community members. Sign in to explore
          profiles, discover common interests, and engage more actively with
          your fellow community members.
        </p>

        <form
          class="flex gap-x-4 mt-10 mx-auto max-w-lg"
          method="post"
          action="/api/auth/signin/email"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <label for="email-address" class="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="bg-white/5 ring-white/10 flex-auto py-3.5 px-5 min-w-0 text-lg text-gray-900 rounded-md border border-gray-100 ring-1 ring-inset shadow-sm focus:ring-2 focus:ring-inset focus:ring-white sm:leading-6"
            placeholder="Enter your email"
          />

          <button
            type="submit"
            class="flex-none py-3.5 px-5 text-lg font-semibold text-white text-gray-900 bg-purple-500 rounded-md shadow-sm hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline focus-visible:outline-offset-2"
          >
            Sign in with Email
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

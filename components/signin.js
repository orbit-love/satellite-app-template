import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Signin() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="py-2 px-3 text-base font-semibold text-white bg-brand-accent rounded-md shadow-sm hover:bg-brand-accent-highlight focus-visible:outline-2 focus-visible:outline-brand-accent-highlight focus-visible:outline focus-visible:outline-offset-2"
      >
        Sign out <span aria-hidden="true">&rarr;</span>
      </button>
    );
  }

  return (
    <button
      className="py-2 px-3 text-base font-semibold text-white bg-brand-accent rounded-md shadow-sm hover:bg-brand-accent-highlight focus-visible:outline-2 focus-visible:outline-brand-accent-highlight focus-visible:outline focus-visible:outline-offset-2"
      onClick={() => router.push("/auth/sign-in")}
    >
      Sign in
    </button>
  );
}

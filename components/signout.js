import { useSession, signOut } from "next-auth/react";

export default function Signout() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="py-2 px-3 text-base font-semibold text-white bg-purple-500 rounded-md shadow-sm hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline focus-visible:outline-offset-2"
      >
        Sign out <span aria-hidden="true">&rarr;</span>
      </button>
    );
  }
}

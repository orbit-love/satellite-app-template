import { useState } from "react";
import Layout from "../components/layout";
import MemberCard from "../components/member-card";

export default function Home({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const [error, setError] = useState("");

  async function refreshMembers() {
    const res = await fetch("/api/populate-members-table", { method: "POST" });

    if (res.ok) {
      const data = await res.json();

      setMembers(data.members);
    } else {
      setError(
        "There was a problem syncing the members! Please verify your workspace slug & API key are set correctly in the environment variables."
      );
    }
  }

  return (
    <Layout>
      {!!error ? <p>{error}</p> : ""}

      <button onClick={refreshMembers}>Refresh</button>

      <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
        <section className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Meet other members
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            This is your space to find others in your community. Engage in
            conversations, share your ideas, and develop strong relationships.
            Step in, join the dialogue, and explore the community!
          </p>
        </section>

        {!!members && members.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-20 mt-20 mx-auto max-w-2xl sm:grid-cols-2 lg:gap-x-8 lg:max-w-4xl xl:max-w-none"
          >
            {members.map((member) => (
              <MemberCard member={member} key={member.id} />
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/members`);
  const data = await res.json();

  if (!data) {
    return {
      props: { initialMembers: [] },
    };
  }

  return {
    props: { initialMembers: data },
  };
}

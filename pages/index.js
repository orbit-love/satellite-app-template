import { useState } from "react";
import Layout from "../components/layout";
import MemberCard from "../components/member-card";
import AdminControls from "../components/admin-controls";
import { useSession } from "next-auth/react";

export default function Home({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="px-6 py-24 mx-auto max-w-[80%] sm:py-32 lg:px-8">
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

        <AdminControls setMembers={setMembers} />

        {!!members && members.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-20 mt-20 mx-auto max-w-2xl sm:grid-cols-2 lg:gap-x-10 lg:max-w-6xl xl:max-w-none 2xl:grid-cols-3"
          >
            {members.map((member) => {
              // Only show members who are visible in directory
              if (member.visible)
                return (
                  <MemberCard
                    member={member}
                    editable={member.email === session?.user.email}
                    key={member.id}
                  />
                );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

// Fetch members from /api/members route on component load (ie, initialise the data)
// This is set as default value for the useState for members
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

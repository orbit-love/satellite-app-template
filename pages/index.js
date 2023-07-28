import { useState } from "react";
import LayoutAuthenticated from "../components/layout-authenticated";
import MemberCard from "../components/member-card";
import { useSession } from "next-auth/react";
import AdminControls from "../components/admin-controls/admin-controls";

export default function Home({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const { data: session } = useSession();

  return (
    <LayoutAuthenticated>
      <div className="px-6 py-24 mx-auto max-w-[80%] sm:py-32 lg:px-8">
        <section className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-brand-dark dark:text-brand-light text-3xl font-bold tracking-tight sm:text-4xl">
            Meet other members
          </h1>

          <p className="text-brand-dark-highlight dark:text-brand-light-highlight mt-6 text-lg leading-8">
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
              if (member.shownInDirectory)
                return (
                  <MemberCard
                    member={member}
                    editable={
                      member.email === session?.user.email ||
                      session?.user.admin
                    }
                    key={member.id}
                  />
                );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </LayoutAuthenticated>
  );
}

// Fetch members from /api/members route on component load (ie, initialise the data)
// This is set as default value for the useState for members
export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/members`, {
    headers: {
      cookie: context.req.headers.cookie,
    },
  });
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

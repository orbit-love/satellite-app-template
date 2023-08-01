import { useState } from "react";
import LayoutAuthenticated from "../components/layout-authenticated";
import AdminControls from "../components/admin-controls/admin-controls";
import MemberList from "../components/member-list";

export default function Home({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);

  return (
    <LayoutAuthenticated>
      <div className="px-6 py-24 mx-auto max-w-[80%] sm:py-32 lg:px-8">
        <section className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-brand-dark dark:text-brand-light text-3xl font-bold tracking-tight sm:text-4xl">
            You're signed in :)
          </h1>
        </section>

        <AdminControls setMembers={setMembers} />

        <MemberList members={members} />
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
    props: {
      initialMembers: data || [],
    },
  };
}

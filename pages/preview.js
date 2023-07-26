import { useState } from "react";
import MemberPreview from "../components/member-preview";
import LayoutUnauthenticated from "../components/layout-unauthenticated";

export default function Preview({ initialMembers }) {
  const [members] = useState(initialMembers);

  return (
    <LayoutUnauthenticated>
      <div className="px-6 py-24 mx-auto max-w-[80%] sm:py-32 lg:px-8">
        <section className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl dark:text-brand-light">
            See members in this community
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            This is your hub to discover members within this community. Sign in
            to see more details!
          </p>
        </section>

        {!!members && members.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-16 mt-20 mx-auto max-w-2xl sm:grid-cols-3 lg:mx-0 lg:max-w-none 2xl:grid-cols-4"
          >
            {members.map((member) => {
              // Only show members who are visible in directory
              if (member.shownInDirectory)
                return <MemberPreview member={member} key={member.id} />;
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </LayoutUnauthenticated>
  );
}

// Fetch members from /api/preview-members route on component load (ie, initialise the data)
// This is set as default value for the useState for members
export async function getServerSideProps(context) {
  const res = await fetch(
    `http://${context.req.headers.host}/api/preview-members`
  );
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

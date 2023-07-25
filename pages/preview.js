import { useState } from "react";
import MemberPreview from "../components/member-preview";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";

export default function Preview({ initialMembers }) {
  const [members] = useState(initialMembers);

  return (
    <div className="bg-white dark:bg-gray-900">
      <Head />

      <main className="px-6 py-24 mx-auto max-w-[80%] sm:py-32 lg:px-8">
        <section className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
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
            className="grid grid-cols-1 gap-x-8 gap-y-16 mt-20 mx-auto max-w-2xl sm:grid-cols-3 lg:grid-cols-4 lg:mx-0 lg:max-w-none"
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
      </main>

      <Footer />
    </div>
  );
}

// Fetch members from /api/members route on component load (ie, initialise the data)
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

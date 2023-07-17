import Head from "next/head";
import { useState } from "react";

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

export default function Members({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);

  return (
    <>
      <Head>
        <title>Member Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Members</h1>
        {!!members && members.length > 0 ? (
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <p>{member.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members</p>
        )}
      </main>
    </>
  );
}

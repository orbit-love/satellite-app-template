import Head from "next/head";

export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/members`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { members: data },
  };
}

export default function Members({ members }) {
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

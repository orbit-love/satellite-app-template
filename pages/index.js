import { useState } from "react";
import Layout from "../components/layout";

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
      <h1>Members</h1>
      {!!members && members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <p>
                {member.name} - {member.email}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No members</p>
      )}

      {!!error ? <p>{error}</p> : ""}

      <button onClick={refreshMembers}>Refresh</button>
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

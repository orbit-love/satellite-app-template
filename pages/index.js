import Layout from "../components/layout";

export default function Home({ session }) {
  return (
    <Layout session={session}>
      <h1>Hello world</h1>
    </Layout>
  );
}

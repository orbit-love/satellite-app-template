import Layout from "../components/layout";
import Login from "../components/login";

export default function Home({ session }) {
  return (
    <Layout session={session}>
      <h1>Hello world</h1>

      <Login />
    </Layout>
  );
}

import { Login } from "@views/login";
import { Layout } from "@components";

function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;

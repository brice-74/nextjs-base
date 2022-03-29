import { Register } from "@views/register";
import { Layout } from "@components";

function RegisterPage() {
  return <Register />;
}

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterPage;

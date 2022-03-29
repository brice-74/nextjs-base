import * as React from "react";
import { Layout } from "@components";

function Home() {
  return (
    <p></p>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

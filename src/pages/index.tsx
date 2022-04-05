import * as React from "react";
import { Layout } from "@components";
import { Home } from "@views/home";

function HomePage() {
  return <Home />
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;

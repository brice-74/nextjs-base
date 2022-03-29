import "../../styles/globals.css";

import { ThemeProvider } from 'next-themes';
import type { AppProps } from "next/app";
import * as React from "react";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { SideNavContextProvider } from "@context/side-nav";
import { FadeTransition, PageTransition } from "@components";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App(props: AppPropsWithLayout) {
  return (
    <ThemeProvider>
      <SideNavContextProvider isOpen={true}>
        <QueryClientProvider client={queryClient}>
          <PageTransition {...FadeTransition}>
            <InnerApp {...props} />
          </PageTransition>
        </QueryClientProvider>
      </SideNavContextProvider>
    </ThemeProvider>
  );
}

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />) as JSX.Element;
}

export default App;

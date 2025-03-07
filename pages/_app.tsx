import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset } from "styled-reset";
import { Layout } from "../components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  html, body {
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  section {
    margin:10px 0px;
  }
`;

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

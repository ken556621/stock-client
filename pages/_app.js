import Head from "next/head";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from "@/theme/theme";

const MetaInfo = () => {
  return (
    <Head>
      <title>Stock Searching</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <MetaInfo />
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default MyApp

import { Provider } from "react-redux";
import { useStore } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css"

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "@/theme/theme";

import "@/components/datePicker/datePicker.css";

const MetaInfo = () => {
  return (
    <Head>
      <title>Koophio</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
};

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <MetaInfo />
            <Component {...pageProps} />
          </CssBaseline>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp

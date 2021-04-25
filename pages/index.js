import Head from "next/head";

import { makeStyles } from "@material-ui/core/styles";

import StockSearchBar from "@/components/StockSearchBar";

const useHomeStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: 550
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 500
  }
}))

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>Stock Searching</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.searchBarRoot}>
        <StockSearchBar />
      </div>
    </div>
  )
};

export default Home;

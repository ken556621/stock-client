
import { makeStyles } from "@material-ui/core/styles";

import StockSearchBar from "@/components/searchInput/StockSearchBar";
import NavigationBar from "@/components/navBar/NavigationBar";
import Footer from "@/components/footer/Footer";

const useHomeStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "100vh"
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 156px)"
  }
}))

const Home = () => {
  const classes = useHomeStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
      <div className={classes.searchBarRoot}>
        <StockSearchBar />
      </div>
      <Footer />
    </div>
  )
};

export default Home;

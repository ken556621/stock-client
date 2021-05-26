
import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import StockSearchBar from "@/components/searchInput/StockSearchBar";

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
      <NavigationBar />
      <div className={classes.searchBarRoot}>
        <StockSearchBar />
      </div>
    </div>
  )
};

export default Home;

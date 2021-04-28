
import { makeStyles } from "@material-ui/core/styles";

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
      <div className={classes.searchBarRoot}>
        <StockSearchBar />
      </div>
    </div>
  )
};

// Todo:
// 1. JWT 認證會員系統
// 2. Price and other element relevent, ex:price and news, price and weather?

export default Home;

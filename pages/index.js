
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "@/components/searchInput/SearchBar";
import NavigationBar from "@/components/navBar/NavigationBar";
import Footer from "@/components/footer/Footer";

const useHomeStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "100vh"
  },
  searchBarRoot: {
    minHeight: "calc(100vh - 156px)"
  },
  stockList: {
    width: 500
  }
}))

const Home = () => {
  const classes = useHomeStyles();

  const handleSearchBarChange = (e) => {
    const value = e.target.value.trim();

    if (!value) return

    console.log(value)
  };


  return (
    <div className={classes.root}>
      <NavigationBar />
      <div className={classes.searchBarRoot}>
        <SearchBar
          classes={{
            inputRoot: classes.inputRoot
          }}
          onChange={handleSearchBarChange}
          placeholder="篩選漲跌幅度"
        />
        <div className={classes.stockList}>
          ken
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Home;

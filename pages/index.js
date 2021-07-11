
import { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash/debounce";

import SearchBar from "@/components/searchInput/SearchBar";
import NavigationBar from "@/components/navBar/NavigationBar";
import Footer from "@/components/footer/Footer";
import StockList from "@/components/list/StockList";

import {
  getStockName
} from "@/api/stock";

const useHomeStyles = makeStyles(theme => ({
  root: {

  },
  content: {
    minHeight: "calc(100vh - 156px)",
    position: "relative"
  },
  searchBarRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  stockList: {
    width: 500
  }
}))

const Home = () => {
  const classes = useHomeStyles();

  const [nameList, setNameList] = useState([]);

  const debounceTime = 500;

  const handleSearchBarChange = (e) => {
    const value = e.target.value.trim();

    if (!value) {
      setNameList([])
      return
    }

    fetchStockList(value)
  };

  const fetchStockList = async (searchInput) => {
    const postData = {
      body: {
        stockId: searchInput
      }
    };

    const res = await getStockName(postData);

    setNameList(res.data)
  };

  const inputChangeDebounce = useCallback(
    debounce(
      (e) => handleSearchBarChange(e),
      debounceTime
    )
    , []);

  return (
    <div className={classes.root}>
      <NavigationBar />
      <div className={classes.content}>
        <div className={classes.searchBarRoot}>
          <SearchBar
            classes={{
              inputRoot: classes.inputRoot
            }}
            onChange={inputChangeDebounce}
            placeholder="搜尋股票代號"
          />
          <StockList
            data={nameList}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Home;

import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";

import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "@/components/searchInput/SearchBar";
import NavigationBar from "@/components/navBar/NavigationBar";
import Footer from "@/components/footer/Footer";
import StockList from "@/components/list/StockList";

import { getStockName } from "@/api/stock";

const useHomeStyles = makeStyles(theme => ({
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
}));

const Home = () => {
  const classes = useHomeStyles();

  const router = useRouter();

  const [nameList, setNameList] = useState([]);

  const debounceTime = 500;

  const fetchStockList = async searchInput => {
    const postData = {
      body: {
        stockId: searchInput
      }
    };

    const res = await getStockName(postData);

    if (!res.data || !Array.isArray(res.data)) {
      return;
    }

    setNameList(res.data);
  };

  const handleSearchBarChange = e => {
    const value = e.target.value.trim();

    if (!value) {
      setNameList([]);
      return;
    }

    fetchStockList(value);
  };

  const handleClickTargetStock = ({ name, symbol }) => {
    if (!symbol) return;

    const stockId = symbol.split(".")[0];

    router.push(`/detail/${stockId}`);
  };

  const inputChangeDebounce = useCallback(
    debounce(e => handleSearchBarChange(e), debounceTime),
    []
  );

  return (
    <div>
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
            handleClickTargetStock={handleClickTargetStock}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

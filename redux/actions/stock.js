import actionTypes from "../constants/actionTypes";
import uniqBy from "lodash/uniqBy";
import merge from "lodash/merge";

import {
    getAllGrossMargin,
    getAllPriceEarnRatio
} from "@/api/individualStock";

const {
    SET_ALL_STOCK_INFO
} = actionTypes;

export const reqAllStockInfoAction = () => async (dispatch) => {
    const uniqTwoSeasonGrossProfit = (data) => {
        return uniqBy(data, ele => {
            return ele.stockNo
        })
    };

    const combineTwoStockArr = (arr1, arr2) => {
        const mergedList = merge(arr1, arr2);

        return mergedList
    };

    try {
        const grossMarginRes = await getAllGrossMargin();
        const priceReanRatio = await getAllPriceEarnRatio();

        if (!grossMarginRes.isSuccess || !priceReanRatio.isSuccess) {
            return []
        }

        const uniqedGrossMarginList = uniqTwoSeasonGrossProfit(grossMarginRes.data);
        const formatedList = combineTwoStockArr(uniqedGrossMarginList, priceReanRatio.data);

        dispatch(setAllStockInfo(formatedList))
    } catch (error) {

    }
};

export const setAllStockInfo = info => ({
    type: SET_ALL_STOCK_INFO,
    payload: info
});

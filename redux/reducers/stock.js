import { produce } from "immer";

import actionTypes from "../constants/actionTypes";

const initialState = {
    allStockInfo: []
};

const stock = produce((draftState = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_STOCK_INFO: {
            draftState.allStockInfo = action.payload;

            return draftState;
        }
        default:
            return draftState;
    }
});

export default stock;
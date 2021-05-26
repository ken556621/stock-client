import { produce } from "immer";

import actionTypes from "../constants/actionTypes";

const initialState = {
    userSelectedType: "macroEconomics" // macroEconomics, industrialStock, individualStock
};

const user = produce((draftState = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_SELECTED_TYPE:
            draftState.userSelectedType = action.payload;

            return draftState;
        default:
            return draftState;
    }
});

export default user;
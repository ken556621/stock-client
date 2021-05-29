import { produce } from "immer";

import actionTypes from "../constants/actionTypes";

const initialState = {

};

const user = produce((draftState = initialState, action) => {
    switch (action.type) {
        default:
            return draftState;
    }
});

export default user;
import actionTypes from "../constants/actionTypes";

export const setUserSelected = (type) => ({
    type: actionTypes.SET_USER_SELECTED_TYPE,
    payload: type
});
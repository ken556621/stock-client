import { useMemo } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store;

const middleware = applyMiddleware(thunk);
const composeMiddleware = compose(middleware);

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const makeStore = (initialState) => {
    const store = (process.env.NODE_ENV === "production")
        ? createStore(persistedReducer, initialState, composeMiddleware)
        : createStore(persistedReducer, initialState, composeWithDevTools(composeMiddleware))

    if (typeof window === "object" && !window.REDUX_STORE) window.REDUX_STORE = store;

    return store;
};

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export const useStore = (initialState) => {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
};

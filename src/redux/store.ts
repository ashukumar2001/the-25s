/* eslint-disable import/no-anonymous-default-export */
import { compose, createStore } from "redux";
import reducers from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["Game"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(persistedReducer, {}, composeEnhancers());
  let persistor = persistStore(store);

  return { store, persistor };
};

import { persistReducer, persistStore } from "redux-persist";

import adminReducer from "./reducers/reducers";
import { createStore } from "redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, adminReducer);
// Store
const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;

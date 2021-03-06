import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/root_reducer";
import thunk from "redux-thunk";


export default function configureStore() {
  const storeData = JSON.parse(localStorage.getItem("storeData"));
  const storeVersion = localStorage.getItem("storeVersion");
  const currentStoreVersion = "2";
  const preloadedState = (storeVersion === currentStoreVersion && storeData) ? storeData : {}
  localStorage.setItem("storeVersion", currentStoreVersion);
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  store.subscribe(() => {
    localStorage.setItem("storeData", JSON.stringify(store.getState()));
  });
  return store;
}
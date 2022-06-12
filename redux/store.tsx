import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

export function getCart(store: any) {
  return store.cartReducer;
}
export function getCountPanier(store: any) {
  return store.CountPanierReducer;
}

export default store;

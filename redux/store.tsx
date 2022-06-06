import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);
export function getCart(store: any) {
  return store.cartReducer;
}

export default store;

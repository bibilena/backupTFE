import { combineReducers } from "redux";
import  cartReducer  from "./cartReducer";
import CountPanierReducer from "./CountPanierReducer";

const rootReducer = combineReducers({
    cartReducer : cartReducer,
    CountPanierReducer: CountPanierReducer
})

export default rootReducer
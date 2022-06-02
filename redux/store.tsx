import {createStore} from "redux"
import cartReducer from "./cartReducer"
import rootReducer from "./rootReducer"

const store = createStore(rootReducer)
export function getCart(store: any){
    return store.cartReducer
}
export const getAllCart = (store: { cartReducer: any }) => store.cartReducer


export default store


/*import {applyMiddleware, createStore} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"

const composeEnhancers = composeWithDevTools({})
const store = createStore(rootReducer, composeEnhancers())

export default store   
export type RootState = ReturnType<typeof store.getState>
*/
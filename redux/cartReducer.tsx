
const initialState: any = []

const ADD_TO_CART = "ADD_TO_CART"
const DELETE_FROM_CART = "DELETE_FROM_CART"


export function addCart(nomSand: string)  {
    return{
        type: ADD_TO_CART,
        payload: {
            nomSand
        }
    }
 }
 export function  deleteFromCart(nomSand: any) {
     return{
        type: DELETE_FROM_CART,
        payload: {
            nomSand
        }
     }
     
 }
 




const cartReducer = (state = initialState, action:  any )=>{
    switch (action.type){
        case ADD_TO_CART:
            return [...state, {
                nomSand: action.payload.nomSand
            }]
            //
        case DELETE_FROM_CART:
            return state.filter((cart: any) => cart.nomSand.props.children !== action.payload.nomSand.props.children)
            //    
        default: 
            return state
    }
}
export default cartReducer


/*import { Actions } from "@reduxjs/toolkit"

const initialState = {
    cartItems : ["item"]
}


export const cartReducer = (state= initialState, action: Actions)=> {

    switch (action.type){

        default : return state
    }
}*/
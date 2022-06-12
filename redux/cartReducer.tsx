const initialState: any = [];

const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

export function addCart(nomSand: string, prixSand: number) {
  return {
    type: ADD_TO_CART,
    payload: {
      nomSand,
      prixSand,
    },
  };
}
export function deleteFromCart(nomSand: any) {
  return {
    type: DELETE_FROM_CART,
    payload: {
      nomSand,
    },
  };
}
export function deleteAllFromCart() {
  return {
    type: DELETE_ALL_FROM_CART,
  };
}

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state,
        {
          nomSand: action.payload.nomSand,
          prixSand: action.payload.prixSand,
        },
      ];
    case DELETE_FROM_CART:
      return state.filter(
        (cart: any) => cart.nomSand !== action.payload.nomSand
      );
    case DELETE_ALL_FROM_CART:
      return [(state = initialState)];
    default:
      return state;
  }
};
export default cartReducer;

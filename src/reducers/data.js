import { FETCH_ITEMS, ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT, CLEAR_CART } from "../actions"

const initialCart = {}
const initialState = {
    items: null,
    cart: initialCart
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case ADD_TO_CART:
            var newCart = {...state.cart}
            if(action.payload in state.cart){
                newCart[action.payload] = newCart[action.payload] + 1
            } else {
                newCart[action.payload] = 1
            }

            return {
                ...state,
                cart: newCart
            }
        case REMOVE_FROM_CART:
            var newCart = {...state.cart}
            if(action.payload in state.cart && state.cart[action.payload] > 1){
                newCart[action.payload] = newCart[action.payload] - 1
            } else {
                delete newCart[action.payload]
            }
            return {
                ...state,
                cart: newCart
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        case CHECKOUT:
            return {
                ...state,
                cart: initialCart
            }
        default:
            return state
    }
}
import { FETCH_ITEMS, ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT } from "../actions"

const initialCart = {
    full_name: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    venmo: null,
    items: [],
}
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
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: [
                        ...state.cart.items,
                        action.payload
                    ]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter(element => element.id != action.payload.id)
                }
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
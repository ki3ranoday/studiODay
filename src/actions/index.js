import {itemsRef} from '../firebase'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const CHECKOUT = 'CHECKOUT'

export const LEAVE_REVIEW = 'LEAVE_REVIEW'

export const FETCH_ITEMS = 'FETCH_ITEMS'

export const addToCart = item => dispatch => {
    return dispatch({
        type:ADD_TO_CART,
        payload: item
    })
}

export const removeFromCart = item => dispatch => {
    return dispatch({
        type:REMOVE_FROM_CART,
        payload: item
    })
}

export const clearCart = () => dispatch => {
    return dispatch({
        type: CLEAR_CART,
        payload: null
    })
}

export const checkout = cartupdates => async dispatch => {
    itemsRef.update(cartupdates)
}

export const fetchItems = () => async dispatch => {
    itemsRef.on("value", snapshot => {
      dispatch({
        type: FETCH_ITEMS,
        payload: snapshot.val()
      });
    });
  };
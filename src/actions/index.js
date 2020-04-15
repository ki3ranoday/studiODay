import {itemsRef} from '../firebase'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
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
        type:ADD_TO_CART,
        payload: item
    })
}

export const checkout = cart => async dispatch => {
    return dispatch({
        type: CHECKOUT,
        payload: null
    });
}

export const fetchItems = () => async dispatch => {
    itemsRef.on("value", snapshot => {
      dispatch({
        type: FETCH_ITEMS,
        payload: snapshot.val()
      });
    });
  };
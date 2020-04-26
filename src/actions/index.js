import { itemsRef, ordersRef, reviewsRef, subscribersRef } from '../firebase'
import Axios from 'axios'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const CHECKOUT = 'CHECKOUT'

export const LEAVE_REVIEW = 'LEAVE_REVIEW'

export const FETCH_REVIEWS = 'FETCH_REVIEWS'

export const FETCH_ITEMS = 'FETCH_ITEMS'

export const addToCart = item => dispatch => {
    return dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}

export const removeFromCart = item => dispatch => {
    return dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}

export const clearCart = () => dispatch => {
    return dispatch({
        type: CLEAR_CART,
        payload: null
    })
}

export const checkout = (cartupdates, emailinfo, orderInfo) => async dispatch => {
    itemsRef.update(cartupdates)
    console.log(ordersRef);
    ordersRef.push(orderInfo);
    Axios.post('https://us-central1-studioday-52a42.cloudfunctions.net/submitOrder', emailinfo).then(
        res => {
            if (emailinfo.subscribe) {
                console.log('yuh')
                subscribersRef.push({ 'email': emailinfo.email, 'name': emailinfo.name })
            }
            alert('Thank you for submitting your order, we will send you a venmo request soon, and will ship your package when you pay')
            console.log(res)
        }
    ).catch(err => {
        alert(err)
    })
}

export const submitReview = (review) => async dispatch => {
    reviewsRef.push(review)
}

export const fetchReviews = () => async dispatch => {
    reviewsRef.on("value", snapshot => {
        dispatch({
            type: FETCH_REVIEWS,
            payload: snapshot.val()
        });
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
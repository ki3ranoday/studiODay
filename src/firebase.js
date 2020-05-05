import * as firebase from 'firebase'
import {firebaseConfig} from './firebaseConfig'


firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref()

export const itemsRef = databaseRef.child("items")
export const reviewsRef = databaseRef.child("reviews")
export const subscribersRef = databaseRef.child("subscribers")
export const ordersRef = databaseRef.child("orders")
export const messagesRef = databaseRef.child("messages")

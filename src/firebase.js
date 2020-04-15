import * as firebase from 'firebase'
import {firebaseConfig} from './firebaseConfig'

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref()

export const itemsRef = databaseRef.child("items")
export const reviewsRef = databaseRef.child("reviews")
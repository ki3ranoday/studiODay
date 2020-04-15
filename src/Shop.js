import React, { Component } from 'react'
import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig'
import { connect } from 'react-redux';
import { addToCart } from './actions'

class Shop extends Component {
    render() {
        return (
            <div>
                <h1>Shop</h1>
                {
                    this.props.items ? 
                    <>
                        {Object.keys(this.props.items).map(key => {
                            const item = this.props.items[key]
                            return (
                                <div>
                                    <img src = {item['image']} />
                                    <h1>{item['name']}</h1>
                                    <p>{item['description']}</p>
                                    <p>Stock: {item['stock']}</p>
                                    <p>${item['price']}</p>
                                </div>
                            )
                        })}
                    </>
                    :
                    <p> Sorry, there is nothing listed in the shop right now</p>
                }
            </div>
        )
    }
}

const mapStoreToProps = (store) => {
    return {
        items: store.data.items
    }
}
export default connect(mapStoreToProps, {addToCart})(Shop)

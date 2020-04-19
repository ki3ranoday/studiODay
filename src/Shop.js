import React, { Component } from 'react'
import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig'
import { connect } from 'react-redux';
import { addToCart } from './actions'
import { Button } from 'react-bootstrap';
import Cart from './Cart';

class Shop extends Component {
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-8 col'>
                        <h1 className='lg'>Shop</h1>
                        <div className='row'>
                            {
                                this.props.items ?
                                    <>
                                        {Object.keys(this.props.items).map(key => {
                                            const item = this.props.items[key]
                                            return (
                                                <div className='col-xl-6 col-12'>
                                                    <div className='grayBG'>
                                                        <img className='shopImg' src={item['image']} />
                                                        <div className='row'>
                                                            <h3 className='col'>{item['name']}</h3>
                                                            <h3 className='col'>${item['price']}</h3>
                                                        </div>
                                                        <p>{item['description']}</p>
                                                        <div className='row'>
                                                            <p className='col-lg-8 col'>Stock: {item['stock']}</p>
                                                            <Button className='col-lg-4 col' disabled={this.props.items[key]['stock']==0}onClick={() => this.props.addToCart(key)}>Add To Cart</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :
                                    <p> Sorry, there is nothing listed in the shop right now</p>
                            }
                        </div>
                    </div>
                    <div className='col-md-4 col'>
                        <Cart></Cart>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = (store) => {
    return {
        items: store.data.items
    }
}
export default connect(mapStoreToProps, { addToCart })(Shop)

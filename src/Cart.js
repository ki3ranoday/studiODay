import React, { Component } from 'react'
import { connect } from 'react-redux';
import { removeFromCart } from './actions'

class Cart extends Component {

    calculateTotal() {
        var total = 0;
        if (this.props.cart) {
            this.props.cart.items.forEach(itemID => {
                total += this.props.items[itemID]['price']
            })
        }
        return total;
    }

    calculateShipping() {
        var shipping = 0;
        if (this.props.noShipping){
            return 0;
        }
        var shiprates = [0, 7, 10, 13, 15]
        if (this.props.cart) {
            if (this.props.cart.items.length < 5)
                shipping = shiprates[this.props.cart.items.length]
            else
                shipping = 15
        }

        return shipping
    }

    render() {
        return (
            <div>
                <h1 className='lg'>Cart</h1>
                <div className='grayBG'>
                    {
                        this.props.cart ?
                            <>
                                {this.props.cart.items.length == 0? <p>Your cart is empty</p>:
                                Object.keys(this.props.cart.items).map(key => {
                                    var itemID = this.props.cart.items[key]
                                    return (
                                        <div className='row'>
                                            <div className='col-5'>{this.props.items[itemID]['name']}</div>
                                            <div className='col-6'>${this.props.items[itemID]['price']}</div>
                                            <div className='col-1' className='cancel' onClick={() => this.props.removeFromCart(key)}>x</div>
                                        </div>
                                    )
                                })}
                            </> : null
                    }
                    <hr />
                    <div className='row'>
                        <div className='col-5'>Sub Total: </div>
                        <div className='col-6'>${this.calculateTotal()}</div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>Shipping: </div>
                        <div className='col-6'>${this.calculateShipping()}</div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>Total: </div>
                        <div className='col-6'>${this.calculateTotal() + this.calculateShipping()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = store => {
    return {
        items: store.data.items,
        cart: store.data.cart
    }
}
export default connect(mapStoreToProps, { removeFromCart })(Cart)
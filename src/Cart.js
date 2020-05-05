import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { removeFromCart, addToCart } from './actions'

export const calculateTotal = (cart, items) => {
    var total = 0;
    Object.keys(cart).forEach(key => {
        total += items[key]['price'] * cart[key]
    })
    return total;
}

export const calculateShipping = (cart, items, noShipping) => {
    var shipping = 0;
    if (noShipping) return 0;
    Object.keys(cart).forEach(key => {
        if (items[key]['shipping'])
            shipping += items[key]['shipping'] * cart[key];
        else
            shipping += 7 * cart[key];
    })
    if (shipping > 20) {
        return 20
    }
    return shipping
}

export const overStock = (cart, items) => {
    var overStock = false;
    Object.keys(cart).forEach(key => {
        if (cart[key] > items[key]['stock'])
            overStock = true;
    })
    return overStock;
}

class Cart extends Component {
    render() {
        const shipping = calculateShipping(this.props.cart, this.props.items, this.props.noShipping)
        const subtotal = calculateTotal(this.props.cart, this.props.items)
        return (
            <div style={{ margin: '50px' }}>
                <div>
                    {Object.keys(this.props.cart).length == 0 ? <p> Your cart is empty. <Link to='/shop'>Shop</Link> </p> :
                        Object.keys(this.props.cart).map(key => {
                            var item = this.props.items[key]
                            return (
                                <>
                                    <div className='row' >
                                        <div className='col-4 text-left'>{key}</div>
                                        <div className='col-2 text-right cancel' onClick={() => this.props.addToCart(key)}>+</div>
                                        <div className='col-2'>x{this.props.cart[key]}</div>
                                        <div className='col-2 text-left cancel' onClick={() => this.props.removeFromCart(key)}>-</div>
                                        <div className='col-2 text-right'>${this.props.items[key]['price']}</div>
                                    </div>
                                    {this.props.cart[key] > this.props.items[key]['stock'] ?
                                        <div>
                                            <p className='warning text-left'> This item only has {this.props.items[key]['stock']} left in stock</p>
                                        </div> : null
                                    }
                                </>
                            )
                        })
                    }
                    {overStock(this.props.cart, this.props.items) ?
                        <div>
                            <p className='warning text-left'>Some of the items in your order are out of stock. If you would like us to make some just for you, submit your order and they should be ready in 2-4 weeks. If you have other items that are in stock and you would like shipped now, please submit a seperate order.</p>
                        </div> : null}
                    <hr />
                    <div className='row'>
                        <div className='col-9 text-left'>Sub Total: </div>
                        <div className='col-3 text-right'>${subtotal}</div>
                    </div>
                    <div className='row'>
                        <div className='col-9 text-left'>Shipping: </div>
                        <div className='col-3 text-right'>${shipping}</div>
                    </div>
                    <div className='row'>
                        <div className='col-9 text-left'>Total: </div>
                        <div className='col-3 text-right'>${shipping + subtotal}</div>
                    </div>
                    {Object.keys(this.props.cart).length > 0 && this.props.checkoutLink ?
                        <Link to='/checkout'>
                            {overStock(this.props.cart, this.props.items) ?
                                <p className='button dark'>Submit Order</p>: <p className='button dark'>Checkout</p>
                            }
                        </Link>
                        :
                        null}
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
export default connect(mapStoreToProps, { removeFromCart, addToCart })(Cart)
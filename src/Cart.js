import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { removeFromCart } from './actions'

class Cart extends Component {
    calculateTotal = () => {
        var total = 0;
        Object.keys(this.props.cart).forEach(key => {
            total += this.props.items[key]['price'] * this.props.cart[key]
        })
        return total;
    }

    calculateShipping = () => {
        var shipping = 0;
        if (this.props.noShipping) return 0;
        Object.keys(this.props.cart).forEach(key => {
            shipping += 7 * this.props.cart[key]
        })
        if (shipping > 20) {
            return 20
        }
        return shipping
    }

    overStock = () => {
        var overStock = false;
        Object.keys(this.props.cart).forEach(key => {
            if (this.props.cart[key] > this.props.items[key]['stock'])
                overStock = true;
        })
        return overStock;
    }
    render() {
        return (
            <div>
                <h1 className='lg'>Cart</h1>
                <div className='grayBG'>
                    {Object.keys(this.props.cart).length == 0 ? <p> Your cart is empty </p> :
                        Object.keys(this.props.cart).map(key => {
                            return (
                                <>
                                    <div className='row'>
                                        <div className='col-5'>{key}</div>
                                        <div className='col-5'>${this.props.items[key]['price']}</div>
                                        <div className='col-1'>x{this.props.cart[key]}</div>
                                        <div className='col-1' className='cancel' onClick={() => this.props.removeFromCart(key)}>-</div> 
                                    </div>
                                    {this.props.cart[key] > this.props.items[key]['stock'] ?
                                        <div>
                                            <p className='text-danger'> This item currently only has {this.props.items[key]['stock']} left in stock</p>
                                        </div> : null
                                    }
                                </>
                            )
                        })
                    }
                    {this.overStock() ? <p className='text-danger'>Items in your cart are out of stock, you can continue to place your order and we will make those items for you in 2-4 weeks, or you can remove those items.</p> : null}
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
                    {Object.keys(this.props.cart).length > 0 && this.props.checkoutLink ? <Link to='/checkout'>Checkout</Link> : null}
                    {Object.keys(this.props.cart).length == 0 && this.props.shopLink ? <Link to='/shop'>Shop</Link> : null}
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
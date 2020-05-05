import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { checkout, clearCart } from './actions'
import Cart, { calculateTotal, calculateShipping, overStock } from './Cart'
import Footer from './Footer'
import { store } from './index'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const initialState = {
    email: '',
    venmo: '',

    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',

    details: '',

    subscribe: false,
    noShipping: false,

    error: null
}
class CheckoutPage extends Component {
    constructor() {
        super()
        this.state = initialState
    }
    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };

    formGood = () => {
        if (Object.keys(this.props.cart).length == 0) {
            this.setState({ error: 'Your cart is empty, add things to check out' })
            return false;
        }
        else if (!this.state.name || !this.state.address || !this.state.city || !this.state.state || !this.state.zip) {
            this.setState({ error: "Please finish filling out your address" })
            return false;
        }
        else if (!this.state.email) {
            this.setState({ error: "Please enter your email so we can reach you if there are any issues with your order" })
            return false;
        }
        else if (!this.state.venmo) {
            this.setState({ error: "Please enter your venmo id, we will send you a venmo request when you complete your order" })
            return false;
        }
        else {
            this.setState({ error: '' })
            return true;
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (!this.formGood()) {
            return;
        }
        var itemUpdates = {}
        Object.keys(this.props.cart).forEach(item => {
            var key = item + '/stock';
            if (this.props.items[item]['stock'] - this.props.cart[item] > 0) {
                itemUpdates[key] = this.props.items[item]['stock'] - this.props.cart[item]
            }
        })
        const emailinfo = {
            'email': this.state.email,
            'name': this.state.name,
            'emailText': this.emailText(),
            'emailHTML': this.emailHtml(),
            'subscribe': this.state.subscribe
        }
        const shipping = calculateShipping(this.props.cart, this.props.items, this.state.noShipping)
        const total = calculateTotal(this.props.cart, this.props.items, this.state.noShipping)
        const orderInfo = {
            'name': this.state.name,
            'email': this.state.email,
            'venmo': this.state.venmo,
            'cart': this.props.cart,
            'shipping': shipping,
            'total': total,
            'details': overStock(this.props.cart, this.props.items) && !this.state.details ? 'commission' :  this.state.details,
            'address': {
                'address': this.state.address,
                'city': this.state.city,
                'state': this.state.state,
                'zip': this.state.zip
            }
        }
        if (!this.state.error) {
            this.props.checkout(itemUpdates, emailinfo, orderInfo);
            this.props.clearCart();
            this.setState({ ...initialState });
        }
    }

    emailText = () => {
        var email = '';

        email += 'Order for ' + this.state.name + ',\n\n'
        Object.keys(this.props.cart).forEach(key => {
            email += key + ':\tx' + this.props.cart[key] + '\t$' + this.props.items[key]['price'] + '\n'
        })
        email += 'Subtotal: ' + Cart.calculateTotal + '\n\n'
        email += 'Shipping: ' + Cart.calculateShipping + '\n\n'
        email += 'Total: ' + (Cart.calculateTotal + Cart.calculateShipping) + '\n\n'
        email += 'Venmo: ' + this.state.venmo + '\n'
        email += 'Email: ' + this.state.email + '\n\n'
        email += 'Address:\n\n'
        email += this.state.name + '\n'
        email += this.state.address + '\n'
        email += this.state.city + ' ' + this.state.state + ', ' + this.state.zip

        return email
    }

    emailHtml = () => {
        return renderToString(
            <Provider store={store}>
                <BrowserRouter>
                    <OrderEmail
                        email={this.state.email}
                        venmo={this.state.venmo}

                        name={this.state.name}
                        address={this.state.address}
                        city={this.state.city}
                        state={this.state.state}
                        zip={this.state.zip}

                        subscribe={this.state.subsribe}
                        noShipping={this.state.noShipping}
                    />
                </BrowserRouter>
            </Provider>
        )
    }


    render() {
        return (
            <div>
                <div className='narrowPage'>
                    <Cart noShipping={this.state.noShipping} shopLink={true}></Cart>
                    <br />
                    <br />
                    <form style={{ textAlign: "left" }}>
                        <h5>Address</h5>
                        <div className='row'>
                            <label className='col-3' for='name'>Name:</label> &nbsp;
                            <input
                                required
                                type='text'
                                id='name'
                                placeholder='name'
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='row'>
                            <label className='col-3' for='address'>Address: </label> &nbsp;
                            <input
                                required
                                type='text'
                                id='address'
                                placeholder='Street Address'
                                value={this.state.address}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='row'>
                            <label className='col-3' for='city'>City: </label> &nbsp;
                            <input
                                required
                                type='text'
                                id='city'
                                placeholder='City or Town'
                                value={this.state.city}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='row'>
                            <label className='col-3' for='state'>State: </label> &nbsp;
                            <input
                                required
                                type='text'
                                id='state'
                                placeholder='State'
                                value={this.state.state}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className='row'>
                            <label className='col-3' for='zip'>Zipcode: </label> &nbsp;
                            <input
                                required
                                type='text'
                                id='zip'
                                placeholder='Zipcode'
                                value={this.state.zip}
                                onChange={this.onChange}
                            />
                        </div>
                        <br />
                        <input
                            type='checkbox'
                            id='noShipping'
                            checked={this.state.noShipping}
                            onChange={() => { this.setState({ noShipping: !this.state.noShipping }) }}
                        /> &nbsp;
                        <label for='noShipping'>I live nearby, you can just drop my order off at my house</label>
                        <br /> <br />
                        <h5>Info</h5>

                        <div className='row'>
                            <label className='col-3' for='venmo'>Venmo ID:</label> &nbsp;
                            <input
                                required
                                type='text'
                                id='venmo'
                                placeholder='venmo id'
                                value={this.state.venmo}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='row'>
                            <label className='col-3' for='email'>Email:</label> &nbsp;
                            <input
                                required
                                type='text'
                                id='email'
                                placeholder='email'
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        {overStock(this.props.cart, this.props.items) ?
                            <div>
                                <br />
                                <label for='details'>Let us know if there are any small changes you would like when we make your order. Since we are making these items just for you, we want them to feel special</label>
                                <textarea
                                    type='text'
                                    id='details'
                                    placeholder='comment'
                                    value={this.state.details}
                                    onChange={this.onChange}
                                />
                            </div> : null
                        }
                        <br />
                        <input
                            type='checkbox'
                            id='subscribe'
                            checked={this.state.subscribe}
                            onChange={() => { this.setState({ subscribe: !this.state.subscribe }) }}
                        /> &nbsp;
                        <label for='subscribe'>I want to hear when you have new things for sale</label>
                        <br />
                        {this.state.error ? <p className='text-danger'>{this.state.error}</p> : null}
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='float-left'>
                                {overStock(this.props.cart, this.props.items) ?
                                    <p className='button dark' onClick={event => this.onSubmit(event)}>Submit Order</p>
                                    :
                                    <p className='button dark' onClick={event => this.onSubmit(event)}>Checkout</p>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

class OrderEmail extends Component {
    render() {
        return (
            <div className='grayBG'>
                <h5>Order for: </h5>
                <p>Name: {this.props.name}</p>
                <p>Email: {this.props.email}</p>
                <p>Venmo: {this.props.venmo}</p>
                <br />
                <h5>Address: </h5>
                <p>{this.props.name}</p>
                <p>{this.props.address}</p>
                <p>{this.props.city}</p>
                <p>{this.props.state}</p>
                <p>{this.props.zip}</p>
                <br />
                <div>
                    <input type='checkbox' disabled='disabled' checked={this.props.subscribe} /> &nbsp;
                    <p>Subscribe</p>
                </div>
                <div>
                    <input type='checkbox' disabled='disabled' checked={this.props.noShipping} /> &nbsp;
                    <p>Local Drop Off</p>
                </div>
                <p>{this.props.name}</p>
                <Cart noShipping={this.props.noShipping} checkoutLink={false} shopLink={false}></Cart>
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
export default connect(mapStoreToProps, { checkout, clearCart })(CheckoutPage);
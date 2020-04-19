import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { checkout, clearCart } from './actions'
import Cart from './Cart'

const initialState = {
        email: '',
        venmo:'',

        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',

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

    checkForm = () => {
        if(!this.state.name || !this.state.address || !this.state.city || !this.state.state || !this.state.zip){
            return "Please finish filling out your address"
        }
        if(!this.state.email){
            return "Please enter your email so we can reach you if there are any issues with your order"
        }
        if(!this.state.venmo){
            return "Please enter your venmo id, we will send you a venmo request when you complete your order"
        }
        return null;
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({error: this.checkForm()})
        if(this.state.error){
            return;
        }
        if(this.props.cart.items.length == 0){
            this.setState({error:'Your cart is empty, add things to check out'});
            return;
        }
        var itemUpdates = {}
        this.props.cart.items.forEach(item => {
            var key = item+'/stock';
            if(key in itemUpdates){
                if(itemUpdates[key]-1 >= 0){
                    itemUpdates[key] = itemUpdates[key]-1
                }else{
                    this.setState({error: "Sorry, there isn't enough " + this.props.items[item]['name'] + " left in stock" })
                    return;
                }
            } else {
                if(this.props.items[item]['stock'] - 1 >= 0){
                    itemUpdates[key] = this.props.items[item]['stock'] - 1
                }else{
                    this.setState({error: "\nSorry, there isn't enough " + this.props.items[item]['name'] + " left in stock" })
                    return;
                }
            }
        })
        if(!this.state.error){
            this.props.checkout(itemUpdates);
            this.props.clearCart();
            this.setState({...initialState});
        }

    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <Cart noShipping={this.state.noShipping}></Cart>
                </div>
                <br />
                <div className='col-md-6 col-12'>
                    <h1 className='lg'>Checkout</h1>
                    <form className='grayBG' style={{ textAlign: "left" }}>
                        
                       
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
                        <input
                            type='checkbox'
                            id='noShipping'
                            checked={this.state.noShipping}
                            onChange={() => { this.setState({ noShipping: !this.state.noShipping }) }}
                        /> &nbsp;
                        <label for='noShipping'>I live nearby, you can just drop my order off at my house</label>
                        <br/> <br/>
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
                                type='email'
                                id='email'
                                placeholder='email'
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>

                        <input
                            type='checkbox'
                            id='subscribe'
                            checked={this.state.subscribe}
                            onChange={() => { this.setState({ subscribe: !this.state.subscribe }) }}
                        /> &nbsp;
                        <label for='subscribe'>I want to hear when you have new things for sale</label>
                        <div>
                            {this.state.error? <p className='text-danger'>{this.state.error}</p> : null}
                            <Button onClick={event => this.onSubmit(event)}>Submit</Button>
                        </div>
                    </form>
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
export default connect(mapStoreToProps, { checkout, clearCart })(CheckoutPage);
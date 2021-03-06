import React, { Component } from 'react'
import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig'
import { connect } from 'react-redux';
import { addToCart } from './actions'
import { Button } from 'react-bootstrap';
import Cart from './Cart';
import Footer from './Footer';

class Shop extends Component {
    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    cartNum = () => {
        var num = 0;
        Object.keys(this.props.cart).forEach(key => {
            num += this.props.cart[key]
        })
        return num;
    }
    render() {
        return (
            <div className='shopPageContainer'>
                {this.state.width < 768 ?
                    <div className='cartIconBox' onClick={() => this.refs.cart.scrollIntoView({ behavior: 'smooth' })}>
                        <div className='cartIconNum'>{this.cartNum()}</div>
                        <i className='fa fa-shopping-cart centered'></i>
                    </div>
                    :
                    null
                }
                <div class="parallax-wrapper">
                    <div className='parallax-padding'>
                        <h1 className='parallax-heading'>STUDIODAY <p className='carrot' onClick={() => this.refs.content.scrollIntoView({ behavior: 'smooth' })}>&#9660;</p></h1>
                    </div>
                    <div ref='content' class="content">
                        <div className='shopContainer'>
                            <div className='row'>
                                <div className='col-lg-9 col-md-8 col-12'>
                                    <div className='row'>
                                        {
                                            this.props.items ?
                                                <>
                                                    {Object.keys(this.props.items).sort((a, b) => {
                                                        return this.props.items[b]['stock'] - this.props.items[a]['stock']
                                                    }).map(key => {
                                                        const item = this.props.items[key]
                                                        return (
                                                            <div className='col-xl-4 col-md-6 col-12 noPadding'>
                                                                <div className='shopItemContainer' onClick=''>
                                                                    <img className='shopItemImg' src={item['image']} />
                                                                    <div className='shopItemInfo'>
                                                                        <div className='text'>
                                                                            <h1>{key}</h1>
                                                                            <p>{item['description']}</p>
                                                                            <h3>${item['price']}</h3>
                                                                            {item['stock'] > 0 && (!this.props.cart[key] || item['stock'] > this.props.cart[key]) ?
                                                                                <p className='addToCart button' onClick={() => this.props.addToCart(key)}>Add To Cart</p>
                                                                                :
                                                                                <div>
                                                                                    <p>Out of Stock</p> 
                                                                                    <p className='addToCart button' onClick={() => this.props.addToCart(key)}>Request</p>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    {/* {item['stock'] <= 0 ?
                                                                        <p className='outOfStock'>Out of Stock</p>
                                                                        :
                                                                        <div className='outOfStock text-right'>
                                                                            <p style={{ marginBottom: '0px' }}>{item['stock']}</p>
                                                                            <p>Stock</p>
                                                                        </div>
                                                                    } */}
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
                                <div ref='cart' className='col-lg-3 col-md-4 col-12' style={{ backgroundColor: '#fff9f9' }}>
                                    <Cart checkoutLink={true}></Cart>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div >
        )
    }
}

const mapStoreToProps = (store) => {
    return {
        items: store.data.items,
        cart: store.data.cart
    }
}
export default connect(mapStoreToProps, { addToCart })(Shop)

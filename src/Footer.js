import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSubscriber } from './actions'
import { Link } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    error: '',
    message: '',
}
class Footer extends Component {
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

    onSubmit = (event) => {
        event.preventDefault()
        if (!this.state.name) {
            this.setState({ error: "Please enter your name" })
            return;
        }
        if (!this.state.email) {
            this.setState({ error: "Please enter your email" })
            return;
        }
        this.props.addSubscriber({ name: this.state.name, email: this.state.email })
        this.setState({ ...initialState, message: 'Thanks for subscribing' })
    }
    render() {
        return (
            <div className='footer'>
                <div className='row'>
                    <div className='col d-lg-inline d-none'></div>
                    <div className='col text-left'>
                        <a className='instaLink' href='https://www.instagram.com/_kieramics_/'><i className='fa fa-instagram' /> @_kieramics_</a>
                        <br/>
                        <a className='instaLink' href='https://www.instagram.com/allthingstudioday/'><i className='fa fa-instagram' /> @allthingsstudioday</a>
                        <br/><br/>
                        <Link className='instaLink' to = '/contact'>Contact Us</Link>
                    </div>
                    <div className='col'>
                        <form name='subscribe-form' className='text-left float-left'>
                            <input className='light' type='text' id='name' placeholder='name' value={this.state.name} onChange={event => this.onChange(event)} />
                            <br/>
                            <input className='light' type='text' id='email' placeholder='email' value={this.state.email} onChange={event => this.onChange(event)} />
                            {this.state.error ? <p className='text-danger'>{this.state.error}</p> : null}
                            {this.state.message ? <p>{this.state.message}</p> : null}
                            <p className='button' onClick={(event) => this.onSubmit(event)}>Subscribe</p>
                        </form>
                    </div>
                    <div className='col d-lg-inline d-none'></div>
                </div>
                <p className = 'text-right'>© Kieran O'Day 2020</p>
            </div>
        )
    }
}


export default connect(null, { addSubscriber })(Footer)
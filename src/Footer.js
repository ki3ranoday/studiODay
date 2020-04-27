import React, { Component } from 'react'
import Instagram from './assets/glyph-logo_May2016.png'

export default class Footer extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };
    render() {
        return (
            <div className='footer'>
                <div className='row'>
                    <div className='col'>
                        <a className='instaLink' href='https://www.instagram.com/_kieramics_/'><img className='insta' src={Instagram}></img>@_kieramics_</a> &nbsp;&nbsp;&nbsp;
                        <br/>
                        <a className='instaLink' href='https://www.instagram.com/allthingstudioday/'><img className='insta' src={Instagram}></img>@allthingsstudioday</a>
                    </div>
                    <div className='col'>
                        <form name='subscribe-form'>
                            <input type='text' id='name' placeholder='name' onChange={event => this.onChange(event)} />
                            <input type='text' id='email' placeholder='email' onChange={event => this.onChange(event)} />
                        </form>
                        <p className='button dark' onClick={() => this.onSubmit}>Subscribe</p>
                    </div>
                </div>
                <p>Made by Kieran O'Day</p>
            </div>
        )
    }
}

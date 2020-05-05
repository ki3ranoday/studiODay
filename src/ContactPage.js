import React, { Component } from 'react'
import Footer from './Footer';
import {connect} from 'react-redux'
import {sendMessage} from './actions'
import { init } from 'emailjs-com';

const initialState = {
    name: '',
    email: '',
    message: '',

    error: '',
    success: '',
}
class ContactPage extends Component {
    constructor() {
        super()
        this.state = initialState;
    }

    render() {
        return (
            <div>
                <div className='narrowPage'>
                    <br /><br /><br />
                    <p>We want to hear from you! Let us know if you have any questions, comments, or something special that we can make for you! We will get back to you as soon as we can.</p>
                    <br />
                    <form onSubmit={event => event.preventDefault()} style={{ textAlign: "left" }}>
                        <div className='row'>
                            <div className='col-3'>
                                <label for='name'>Name:</label>
                            </div>
                            <div className='col-9'>
                                <input
                                    required
                                    type='text'
                                    id='name'
                                    placeholder='name'
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label for='name'>Email:</label>
                            </div>
                            <div className='col-9'>
                                <input
                                    required
                                    type='text'
                                    id='email'
                                    placeholder='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label for='name'>Message:</label>
                            </div>
                            <div className='col-9'>
                                <textarea
                                    required
                                    type='text'
                                    id='message'
                                    placeholder='message'
                                    value={this.state.message}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        {this.state.error? <p className='text-danger'>{this.state.error} </p> : null}
                        {this.state.success? <p>{this.state.success} </p> : null}

                        <p className='button dark' onClick={() => this.onSubmit()}>
                            Submit
                    </p>
                    </form>

                </div >
                <Footer />
            </div>
        )
    }

    onSubmit = () => {
        if (!this.checkForm()) return;

        const messageInfo = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }

        this.props.sendMessage(messageInfo);
        
        this.setState({
            ...initialState,
            success: 'Thank you for contacting us. We will get back to you soon'
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    };

    checkForm = () => {
        if (!this.state.name) {
            this.setState({ error: 'Please enter your name' });
            return false;
        }
        if (!this.state.email) {
            this.setState({ error: 'Please enter your email' });
            return false;
        }
        if (!this.state.name) {
            this.setState({ error: 'Please enter a message' });
            return false;
        }
        return true
    }
}


export default connect(null, {sendMessage})(ContactPage)
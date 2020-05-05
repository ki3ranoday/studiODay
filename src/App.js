import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import CheckoutPage from './CheckoutPage'
import Shop from './Shop'
import './App.css';
import Bar from './Navbar';
import { connect } from 'react-redux';
import { fetchItems, fetchReviews } from './actions';
import ContactPage from './ContactPage';

class App extends Component {
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchReviews();
  }
  render() {
    return (
      <div className="App">
        <Bar></Bar>
        <Switch>
          <Route exact path='/' component={Shop} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/contact' component={ContactPage}/>
        </Switch>
      </div>
    );
  }
}

export default connect(null, { fetchItems, fetchReviews })(App);

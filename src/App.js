import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import CheckoutPage from './CheckoutPage'
import Shop from './Shop'
import './App.css';
import Bar from './Navbar';
import { connect } from 'react-redux';
import { fetchItems, fetchReviews } from './actions';

class App extends Component {
  componentDidMount(){
    this.props.fetchItems();
    this.props.fetchReviews();
  }
  render(){
  return (
    <div className="App">
      <Bar></Bar>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/shop' component={Shop} />
        </Switch>
    </div>
  );
  }
}

export default connect(null, {fetchItems, fetchReviews})(App);

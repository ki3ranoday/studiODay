import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Cart from './Cart'
import Shop from './Shop'
import './App.css';
import Bar from './Navbar';

function App() {
  return (
    <div className="App">
      <Bar></Bar>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/shop' component={Shop} />
        </Switch>
    </div>
  );
}

export default App;

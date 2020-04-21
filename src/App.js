import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navigation from './components/AbsoluteValues/Navigation/Navigation';
import AbsoluteValues from './components/AbsoluteValues/AbsoluteValues';
import PerMillion from './components/PerMillion/PerMillion';
import Loading from './components/Loading/Loading';

import './App.css';

const countriesArr = [
  {
    name: 'Serbia',
    color: '#f70000'
  },
  {
    name: 'Albania',
    color: '#f7ad00'
  },
  {
    name: 'Bulgaria',
    color: '#ebe834'
  },
  {
    name: 'Hungary',
    color: '#71eb34'
  },
  {
    name: 'Slovenia',
    color: '#34eb99'
  },
  {
    name: 'Greece',
    color: '#34d6eb'
  },
  {
    name: 'Bosnia',
    color: '#347aeb'
  },
  {
    name: 'Romania',
    color: '#6834eb'
  },
  {
    name: 'Croatia',
    color: '#ca00f7'
  },
  {
    name: 'Montenegro',
    color: '#f7008c'
  }
]

class App extends Component {
  state = {
    isLoading: true
  }

  endLoading = () => {
    this.setState({
      isLoading: false
    })
  }

  startLoading = () => {
    this.setState({
      isLoading: true
    })
  }

  render () {
    const {isLoading} = this.state;

    return (
      <Router>
        <div className='app'>
          <div className='app-container'>
            <Navigation startLoading={this.startLoading}/>
            <Loading isLoading={isLoading}/>
            <Route path='/' component={() => <PerMillion endLoading={this.endLoading} isLoading={isLoading} countriesArr={countriesArr}/>} exact />
            <Route path='/absolute' component={() => <AbsoluteValues endLoading={this.endLoading} isLoading={isLoading} countriesArr={countriesArr}/>} exact />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

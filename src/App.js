import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {WindowManager} from 'react-window-decorators';
import breakpoints from './constants/breakpoint';

import Navigation from './components/Navigation/Navigation';
import AbsoluteValues from './components/AbsoluteValues/AbsoluteValues';
import PerMillion from './components/PerMillion/PerMillion';
import Loading from './components/Loading/Loading';

import './App.scss';

new WindowManager(breakpoints.formatted, 100);

const countriesArr = [
  {
    name: 'Serbia',
    color: '#f70000',
    abb: 'SER',
  },
  {
    name: 'Albania',
    color: '#f7ad00',
    abb: 'AL',
  },
  {
    name: 'Bulgaria',
    color: '#ebe834',
    abb: 'BG',
  },
  {
    name: 'Hungary',
    color: '#71eb34',
    abb: 'HUN',
  },
  {
    name: 'Slovenia',
    color: '#34eb99',
    abb: 'SVN',
  },
  {
    name: 'Greece',
    color: '#34d6eb',
    abb: 'GR',
  },
  {
    name: 'Bosnia',
    color: '#347aeb',
    abb: 'BIH',
  },
  {
    name: 'Romania',
    color: '#6834eb',
    abb: 'ROU',
  },
  {
    name: 'Croatia',
    color: '#ca00f7',
    abb: 'HRV',
  },
  {
    name: 'Montenegro',
    color: '#f7008c',
    abb: 'MNE',
  },
];

class App extends Component {
  state = {
    isLoading: true,
  };

  endLoading = () => {
    this.setState({
      isLoading: false,
    });
  };

  startLoading = () => {
    this.setState({
      isLoading: true,
    });
  };

  render() {
    const {isLoading} = this.state;

    return (
      <div className="app">
        <Router>
            <Loading isLoading={isLoading} />
            <h1 className="app-title">Covid-19 stats for Serbia and region</h1>
            <div className="app-container">
              <Navigation startLoading={this.startLoading} />
              <Route
                path="/"
                component={() => (
                  <PerMillion
                    endLoading={this.endLoading}
                    isLoading={isLoading}
                    countriesArr={countriesArr}
                  />
                )}
                exact
              />
              <Route
                path="/absolute"
                component={() => (
                  <AbsoluteValues
                    endLoading={this.endLoading}
                    isLoading={isLoading}
                    countriesArr={countriesArr}
                  />
                )}
                exact
              />
            </div>
        </Router>
      </div>
    );
  }
}

export default App;

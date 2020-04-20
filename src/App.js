import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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

const charts = ['cases', 'deaths', 'recovered']

class App extends Component {
  state = {
    countries: null
  }

//https://corona.lmao.ninja/v2/countries/

  componentDidMount() {
    let countries = []
    countriesArr.map((country) => {
      axios.get(`https://corona.lmao.ninja/v2/historical/${country.name}`)
      .then(res => {        
        countries.push({...res.data});
        
        this.setState({ countries });
      })
    })
  }

  getData = (chartBy) => {
    const {countries} = this.state;

    var options = {  month: 'numeric', day: 'numeric' };
    
    return Object.keys(countries[0].timeline[chartBy]).map((date) => {
      const dateLocal = new Date(date)
      let line = {name: dateLocal.toLocaleDateString('en-GB',options)}
      countries.forEach(country => {
        line[country.country] = country.timeline[chartBy][date]
      });
      return line;
    })
  }

  renderCharts = () => {
    const {countries} = this.state;

    if(!countries) {
      return null
    }

    return charts.map((chart) => {
      return (
        <>
          <h1>{`Number of ${chart}`}</h1>
          <LineChart 
            width={1000} 
            height={500} 
            data={this.getData(chart)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
            key={chart}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend />
            {countriesArr.map(country => {
              return (<Line type="monotone" dataKey={country.name} stroke={country.color} activeDot={{ r: 5 }}/>)
            })}
          </LineChart>
        </>
      )
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          {this.renderCharts()}
        </header>
      </div>
    );  
  }
}

export default App;

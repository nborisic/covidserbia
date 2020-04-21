import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';

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

// testsPerOneMillion

const lineCharts = ['cases', 'deaths', 'recovered'];
const barCharts = ['cases','deaths','tests']

class App extends Component {
  state = {
    countriesTime: [],
    countriesMil: []
  }

  componentDidMount() {
    let countriesTime = [];
    let countriesMil = [];

    countriesArr.map((country) => {
      axios.get(`https://corona.lmao.ninja/v2/historical/${country.name}`)
      .then(res => {        
        countriesTime.push({...res.data});
        
        this.setState({ countriesTime });
      })
      axios.get(`https://corona.lmao.ninja/v2/countries/${country.name}`)
      .then(res => {        
        countriesMil.push({...res.data});
        
        this.setState({ countriesMil });
      })
    })
  }

  getData = (chartBy) => {
    const {countriesTime} = this.state;

    var options = {  month: 'numeric', day: 'numeric' };
    
    return Object.keys(countriesTime[0].timeline[chartBy]).map((date) => {
      const dateLocal = new Date(date)
      let line = {name: dateLocal.toLocaleDateString('en-GB',options)}
      countriesTime.forEach(country => {
        line[country.country] = country.timeline[chartBy][date]
      });
      return line;
    })
  }

  getBarData = (chartBy) => {
    const {countriesMil} = this.state;
    console.log('countriesMil',countriesMil);
    
    const barData = countriesMil.map((country) => {
      let bar = {name: country.country, value: country[`${chartBy}PerOneMillion`]}
      return bar;
    })

    console.log('barData',barData);
    

    return barData;
  }

  renderBarCharts = () => {
    return barCharts.map((chart) => {
      return (
        <div key={chart}>
          <h1>{`Number of ${chart} per million`}</h1>
          <BarChart 
            width={1000} 
            height={500} 
            data={this.getBarData(chart)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            {/* <Tooltip /> */}
            <Bar dataKey='value' fill={'#f7008c'}/>
          </BarChart>
        </div>
      )
    })
  }

  renderLineCharts = () => {
    return lineCharts.map((chart) => {
      return (
        <div key={chart}>
          <h1>{`Number of ${chart}`}</h1>
          <LineChart 
            width={1000} 
            height={500} 
            data={this.getData(chart)}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend />
            {countriesArr.map(country => {
              return (<Line key={country.name} type="monotone" dataKey={country.name} stroke={country.color} activeDot={{ r: 5 }}/>)
            })}
          </LineChart>
        </div>
      )
    })
  }

  render () {
    const {countriesTime, countriesMil} = this.state;

    if(!(countriesArr.length === countriesTime.length && countriesArr.length === countriesMil.length)) {
      return <div>Loading...</div>
    }

    return (
      <div className="App">
        <header className="App-header">
          {this.renderBarCharts()}
          {this.renderLineCharts()}
        </header>
      </div>
    );  
  }
}

export default App;

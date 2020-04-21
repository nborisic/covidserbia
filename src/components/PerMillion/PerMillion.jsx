import React, {Component} from 'react';
import axios from 'axios';

import {XAxis, YAxis, CartesianGrid, BarChart, Bar} from 'recharts';

const barCharts = ['cases','deaths','tests']

export default class PerMillion extends Component {
  state = {
    countriesTime: [],
    countriesMil: []
  }

  componentDidMount() {
    const {countriesArr, isLoading, endLoading} = this.props;
    let countriesMil = [];

    const start = async () => {
      for (let index = 0; index < countriesArr.length; index++) {
        const country = countriesArr[index];
        await axios.get(`https://corona.lmao.ninja/v2/countries/${country.name}`)
        .then(res => {        
          countriesMil.push({...res.data});
          
          this.setState({ countriesMil });
        })
      }

      const endLoadingAnimation = countriesArr.length === countriesMil.length;
      if(endLoadingAnimation) {
        isLoading && endLoading();
      }
    };
    
    start();
  }


  getBarData = (chartBy) => {
    const {countriesMil} = this.state;
    
    const barData = countriesMil.map((country) => {
      let bar = {name: country.country, value: country[`${chartBy}PerOneMillion`]}
      return bar;
    }).sort((a, b) => (a.value < b.value) ? 1 : -1)
    
    return barData;
  }

  renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
  };

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
            <Bar dataKey='value' fill={'#f7008c'} label={this.renderCustomBarLabel}/>
          </BarChart>
        </div>
      )
    })
  }

  render () {
  const {countriesMil} = this.state;
  const {countriesArr} = this.props;

  const displayLoading = !(countriesArr.length === countriesMil.length);
  if(displayLoading) {
    return null
  }
    return (
      <div>
          {this.renderBarCharts()}
      </div>
    );  
  }
}


import React, {Component} from 'react';
import axios from 'axios';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const lineCharts = ['cases', 'deaths', 'recovered'];

export default class AbsoluteValues extends Component {
  state = {
      countriesTime: []
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  componentDidMount() {
    const {countriesArr, endLoading, isLoading} = this.props;
    let countriesTime = [];

    const start = async () => {
      for (let index = 0; index < countriesArr.length; index++) {
        const country = countriesArr[index];
        console.log(country);
        
        await axios.get(`https://corona.lmao.ninja/v2/historical/${country.name}`)
        .then(res => {        
          countriesTime.push({...res.data});
          
          this.setState({ countriesTime });
        })
      }

      const endLoadingAnimation = countriesArr.length === countriesTime.length;
      if(endLoadingAnimation) {
        isLoading && endLoading();
      }
    };
    
    start();
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

  renderLineCharts = () => {
    const {countriesArr} = this.props;
 
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
    const {countriesTime} = this.state;
    const {countriesArr} = this.props;

    if(!(countriesArr.length === countriesTime.length)) {
      return null
    }

    return (
      <div>
          {this.renderLineCharts()}
      </div>
    );  
  }
}

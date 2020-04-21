import React, {Component} from 'react';
import axios from 'axios';
import { withWindow } from 'react-window-decorators';
import graphWidth from '../../constants/graphWidth';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './index.scss';

const lineCharts = ['cases', 'deaths', 'recovered'];

class AbsoluteValues extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countriesTime: []
    }
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
    const {countriesArr, breakpoint} = this.props;


    return lineCharts.map((chart) => {
      return (
        <div className='absolute-values' key={chart}>
          <h2>{`Number of ${chart}`}</h2>
          <LineChart 
            width={graphWidth[breakpoint].width} 
            height={graphWidth[breakpoint].height} 
            data={this.getData(chart)}
            margin={{top: 20, right: 0, left: 0, bottom: 5}}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend />
            {countriesArr.map(country => {
              return (<Line key={country.name} type="monotone" dataKey={country.name} stroke={country.color} dot={breakpoint !== 'small'} activeDot={{ r: 5 }}/>)
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


export default withWindow(AbsoluteValues)
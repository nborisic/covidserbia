import React, {Component} from 'react';
import virus from '../../assets/coronaviru.svg';
import cx from 'classnames';

import './index.css';

class Loading extends Component {
  render () {
    const {isLoading} = this.props;

    const containerClassName = cx('logo-container',{
      'logo-container--fade': !isLoading
    })
    
    return (
      <div className={containerClassName}>
        <img src={virus} className="logo" alt="coronavirus" />
      </div>
    );
  }
}

export default Loading;

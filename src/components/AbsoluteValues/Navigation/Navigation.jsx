import React, {Component} from 'react';
import {
    NavLink
} from "react-router-dom";
import './index.scss';

export default class Navigation extends Component {
    render() {
        const {startLoading} = this.props;

        return (
            <div className='navigation-wrapper'>
                <NavLink to='/' onClick={() => startLoading()} exact className='navigation-link' activeClassName="navigation-link--active">Stats per million</NavLink>
                <NavLink to='/absolute' onClick={() => startLoading()} exact className='navigation-link' activeClassName="navigation-link--active">Absolute numbers</NavLink>
            </div>
        )
    }
}
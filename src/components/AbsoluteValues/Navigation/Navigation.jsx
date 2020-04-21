import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";

export default class Navigation extends Component {
    render() {
        const {startLoading} = this.props;

        return (
            <div>
                <Link to='/' onClick={() => startLoading()}>Stats per million</Link>
                <Link to='/absolute' onClick={() => startLoading()}>Absolute numbers</Link>
            </div>
        )
    }
}
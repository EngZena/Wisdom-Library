import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css';

export default class NavigationItem extends Component {
    render() {
        return (
            <div className={classes.NavigationItem}
            onClick={this.props.onClick}>
               <NavLink 
               to={this.props.link}
               exact={this.props.exact}
               
               > {this.props.children} </NavLink>
            </div>
        )
    }
}

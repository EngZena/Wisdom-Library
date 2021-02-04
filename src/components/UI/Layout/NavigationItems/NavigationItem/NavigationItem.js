import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css';

export const NavigationItem = (props) => {
        return (
            <div className={classes.NavigationItem}
            onClick={props.onClick}>
               <NavLink 
               to={props.link}
               exact={props.exact}
               
               > {props.children} </NavLink>
            </div>
        )
}
export default NavigationItem;

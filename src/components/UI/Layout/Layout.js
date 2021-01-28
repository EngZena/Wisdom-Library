import React, { Component } from 'react'
import NavigationItems from './NavigationItems/NavigationItems'

import classes from './Layout.module.css';

export default class Layout extends Component {
    render() {
        return (
            <div>
                <div className={classes.NavigationItems}>
                    <NavigationItems isAuth={this.props.isAuth} />
                </div>

                <div>
                    <h1 className={classes.header}>Wisdom Library</h1>
                    <main className={classes.main}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        )
    }
}

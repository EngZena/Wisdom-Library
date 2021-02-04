import React from 'react'
import NavigationItems from './NavigationItems/NavigationItems'

import classes from './Layout.module.css';

export const Layout = (props) => {
        return (
            <div>
                <div className={classes.NavigationItems}>
                    <NavigationItems isAuth={props.isAuth} />
                </div>

                <div>
                    <h1 className={classes.header}>Wisdom Library</h1>
                    <main className={classes.main}>
                        {props.children}
                    </main>
                </div>
            </div>
        )
}

export default Layout;
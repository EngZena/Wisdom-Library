import React from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

export const NavigationItems = () => {
        return (
            <div >
                <AuthContext.Consumer>
                    {({ authenticated }) => (
                        authenticated ? (
                            <div className={classes.NavigationItems}>
                                <NavigationItem link="/" exact > Home </NavigationItem>
                                <NavigationItem link="/Books" exact > Books </NavigationItem>
                                <NavigationItem link="/orders" exact > Orders </NavigationItem>
                                <AuthContext.Consumer>
                                    {({ handleLogout }) =>
                                        <NavigationItem
                                            link="/logout"
                                            exact
                                            onClick={handleLogout}
                                        > Logout </NavigationItem>
                                    }
                                </AuthContext.Consumer>
                            </div>
                        ) :
                            (
                                <div className={classes.NavigationItems}>
                                    <NavigationItem link="/" exact > Home </NavigationItem>
                                    <NavigationItem link="/Books" exact > Books </NavigationItem>
                                    <NavigationItem link="/login" exact > Login </NavigationItem>
                                </div>
                            )
                    )}
                </AuthContext.Consumer>
            </div>
        )
}

export default NavigationItems;

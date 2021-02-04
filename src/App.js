import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import Layout from './components/UI/Layout/Layout';
import Books from './containers/Books/Books';
import HomePage from './containers/Home/HomePage';
import Login from './containers/Login/Login';
import Orders from './containers/Orders/Orders';
import {AuthContext} from './context/AuthContext'
import * as services from './services/authService'
const App = () =>  {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    localStorage.getItem('token') && setAuthenticated(true)
    }, [])
  
    const handleSignUp = async (email, password) => {
        const result = await services.signUp(email, password)
        if(result.status === 200)
        {
          setAuthenticated(true)
          return <Redirect to='/' />
        }
      }


      const handleLogin = async (email, password) => {
      const result = await services.signIn(email, password)
      if(result.status === 200)
      {
        setAuthenticated(true)
        return <Redirect to='/' />
      }

      }
      const handleLogout = () => {
      services.signOut();
      setAuthenticated(false);
    }

    let tabs = (
      <Switch>
        <Route path="/Books" component={Books} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    )


    if (authenticated) {
      tabs = (
        <Switch>
          <Route path="/Books" component={Books} />
          <Route path="/logout"  />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className={classes.App}>
        <AuthContext.Provider 
        value={{
          authenticated: authenticated,
          handleLogin: handleLogin,
          handleLogout: handleLogout,
          handleSignUp: handleSignUp,
        }}
        >
        <Layout 
        isAuth={authenticated}
        >
          {tabs}
        </Layout>
        </AuthContext.Provider>
      </div>
    );
  }


export default App;

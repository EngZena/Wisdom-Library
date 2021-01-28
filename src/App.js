import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import Layout from './components/UI/Layout/Layout';
import Books from './containers/Books/Books';
import HomePage from './containers/Home/HomePage';
import Login from './containers/Login/Login';
import Orders from './containers/Orders/Orders';
import {AuthContext} from './context/AuthContext'
import * as services from './services/authService'
class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    }
  }

  componentDidMount() {
    localStorage.getItem('token') && this.setState({ authenticated: true })
    }
  
    handleSignUp = async (email, password) => {
        const result = await services.signUp(email, password)
        if(result.status === 200)
        {
          this.setState({ authenticated: true })
          return <Redirect to='/' />
        }
      }


    handleLogin = async (email, password) => {
      const result = await services.signIn(email, password)
      if(result.status === 200)
      {
        this.setState({ authenticated: true })
        return <Redirect to='/' />
      }

      }
    handleLogout = () => {
      services.signOut();
      this.setState({ authenticated: false })
    }

  render() {
    let tabs = (
      <Switch>
        <Route path="/Books" component={Books} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    )


    if (this.state.authenticated) {
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
          authenticated: this.state.authenticated,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleSignUp: this.handleSignUp,

        }}
        >
        <Layout 
        isAuth={this.state.authenticated}
        handleChangeAuth={this.handleChangeAuth}
        >
          {tabs}
        </Layout>
        </AuthContext.Provider>
      </div>
    );
  }

}

export default App;

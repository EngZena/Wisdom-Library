import React from 'react'

export const AuthContext = React.createContext({
    authenticated: false,
    handleLogin: () => {},
    handleLogout: () => {},
    handleSignUp: () => {},
  });
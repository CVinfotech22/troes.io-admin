import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthWrapper = () => {
  const location = useLocation() // current location

  const userLogged = JSON.parse(localStorage.getItem('userLogged'))

  return userLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  )
}

export default AuthWrapper

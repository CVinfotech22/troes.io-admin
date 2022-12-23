import React, { Component, Suspense, useState } from 'react'
import { HashRouter, BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import './scss/style.scss'
import Protected from './AuthWrapper'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {!localStorage.getItem('token') ? (
            <>
              <Route path="*" name="Login Page" element={<Login />} />
              {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
            </>
          ) : (
            <>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </>
          )}

          {/* <Route exact path="/customer" name="Customer Page" element={<Customer />} /> */}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
        </Routes>
      </Suspense>
      {/* </BrowserRouter> */}
    </HashRouter>
  )
}
//}

export default App

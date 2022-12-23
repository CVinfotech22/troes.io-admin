import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { homeApi } from '../../../api'
import { troesAPi } from '../../../api'
import './Login.css'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import chargeLogo from '../../../assets/images/chargeLogo.svg'
import bottomImage from '../../../assets/images/bottomImage.svg'
import { Spin } from 'antd'

const Login = () => {
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const login = (e) => {
    setLoading(true)

    e.preventDefault()
    axios
      .post(`${troesAPi}/login`, user)
      .then((res) => {
        localStorage.setItem('token', res.data.success.token)

        navigate('/customer')
        window.location.reload()
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        alert('Invalid details')
      })
  }

  return (
    <div className="bg__white" style={{ position: 'relative' }}>
      <div className="mainDiv__Login">
        <div className="subDiv_of_Login">
          <p className="welcome_login">Welcome!</p>
          <img className="img__chargeLogo" src={chargeLogo} alt="charheLogo" />
          <p style={{ paddingTop: '5px' }}>
            <span className="for_Charge">Charge</span>
            <span className="for__Time">Time</span>
          </p>
        </div>
        {loading ? (
          <div className="setLoading_login">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}
        <div className="signIn_mainDiv">
          <form onSubmit={login}>
            <div className="signIN__Email">
              <p style={{ fontWeight: 'bold', fontSIze: '18px' }}>Sign in to your account</p>
              <p style={{ fontWeight: '600', fontSIze: '14px' }}>Email</p>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter Your email here"
                className="enterur__email"
                onChange={handleChange}
              />
              <p className="for_password">Password</p>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="password"
                onChange={handleChange}
                className="enterur__password"
              />
            </div>
            <button type="submit" className="submit__type">
              Log in
            </button>
          </form>
        </div>
      </div>

      <div className="mainDivOf_bottom_img">
        <img className="bottomImage__of responsive" src={bottomImage} alt="bottom" />
      </div>
    </div>
  )
}

export default Login

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import chargeLogo from '../../src/assets/images/chargeLogo.svg'
import { Link } from 'react-router-dom'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  let navigate = useNavigate()

  function handleClick() {
    let confirmAction = window.confirm('Are you sure?')
    if (confirmAction) {
      localStorage.removeItem('token')
      navigate('/login')
    } else {
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          // style={{ zIndex: '100000' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <Link to="/">
          <CHeaderBrand className="mx-auto " to="/">
            <img style={{ width: '40px' }} src={chargeLogo} alt="charheLogo" />
          </CHeaderBrand>
        </Link>
        {/* <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav>
          {/* <AppHeaderDropdown /> */}
          {/* <CNavItem>
            <button
              style={{
                // paddingTop: '7px',
                // paddingLeft: '7px',
                fontSize: '18px',
                color: 'black',
                fontWeight: '500',
                border: 'none',
                backgroundColor: '#fff',
              }}
              onClick={handleCustomer}
            >
              Admin
            </button>
          </CNavItem> */}
          <CNavItem>
            <button
              style={{
                marginLeft: '7px',
                border: 'none',
                backgroundColor: '#fff',
                fontSize: '18px',
                color: 'black',
                fontWeight: '500',
              }}
              onClick={handleClick}
            >
              Logout
            </button>
          </CNavItem>
          {/* <CNavItem>
            <button
              style={{
                marginLeft: '7px',
                border: '1px solid black',
                backgroundColor: '#fff',
                fontSize: '18px',
                color: 'black',
                fontWeight: '500',
              }}
              onClick={handleRegister}
            >
              Register new user
            </button>
          </CNavItem> */}
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader

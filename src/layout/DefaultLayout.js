import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  if (localStorage.getItem === '') {
    window.location.href('/login')
  }

  return (
    <div>
      <AppSidebar />

      <div
        className="wrapper d-flex flex-column min-vh-100"
        style={{ background: '#F5F8FF', zIndex: '1000' }}
      >
        <AppHeader />
        <div className="body flex-grow-1 px-0">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout

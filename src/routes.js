import React from 'react'

const Customer = React.lazy(() => import('./views/customer/Customer'))
const Admin = React.lazy(() => import('./views/admin/Admin'))
const Location = React.lazy(() => import('./views/location/Location'))
const Price = React.lazy(() => import('./views/price/Price'))

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/customer', name: 'Customer', element: Customer },
  { path: '/admin', name: 'Admin', element: Admin },
  { path: '/location', name: 'Location', element: Location },
  { path: '/price', name: 'Price', element: Price },
]

export default routes

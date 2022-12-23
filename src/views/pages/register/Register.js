// import React, { useState } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import { Link } from 'react-router-dom'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// //import { customerRegistration } from '../../../api'
// import { useEffect } from 'react'

// const Register = () => {
//   const [message, setMessage] = useState('')
//   const [user, setUser] = useState({
//     email: '',
//     name: '',
//     password: '',
//     c_password: '',
//   })

//   //const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setUser({
//       ...user,
//       [name]: value,
//     })
//   }

//   const register = (e) => {
//     //const registerUrl = customerRegistration
//     const { email, name, password, c_password } = user
//     if (email && name && password && password === c_password) {
//       axios
//         .post(`https://pwacrm.tentoptoday.com/public/api/register`, user)
//         .then((res) => {
//           alert(res.data.message)
//           e.preventDefault()
//           setMessage('You have been registerd')
//           // navigate('/login')
//         })
//         .catch((err) => console.log(err))
//     } else {
//       alert('Invalid Details')
//     }
//   }

//   console.log(user, 'uuuuuuuuu')
//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody
//                 className="p-4"
//                 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               >
//                 {message == '' ? (
//                   <CForm>
//                     <h1 style={{ textAlign: 'center' }}>Register</h1>
//                     <p className="text-medium-emphasis" style={{ textAlign: 'center' }}>
//                       Create your account
//                     </p>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>@</CInputGroupText>

//                       {/* <CFormInput placeholder="Username" autoComplete="username" /> */}
//                       <input
//                         type="email"
//                         name="email"
//                         value={user.email}
//                         placeholder="Enter Your email"
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>

//                       <input
//                         type="text"
//                         name="name"
//                         value={user.name}
//                         placeholder="Enter Your Name"
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       {/* <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                     /> */}
//                       <input
//                         type="password"
//                         name="password"
//                         value={user.password}
//                         placeholder=" password"
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>

//                       <input
//                         type="password"
//                         name="c_password"
//                         value={user.c_password}
//                         placeholder="confirm password"
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>
//                     <div className="d-grid">
//                       <CButton color="success" onClick={register} style={{ color: '#fff' }}>
//                         Register new user
//                       </CButton>
//                     </div>
//                   </CForm>
//                 ) : (
//                   <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
//                     {message} {user.name}
//                   </p>
//                 )}
//                 {/* <Link to="/login">
//                   <CButton color="primary" className="mt-3" active tabIndex={-1}>
//                     Sign in
//                   </CButton>
//                 </Link> */}
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register

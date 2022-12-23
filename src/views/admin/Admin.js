import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AutoComplete, Button, Checkbox, Spin } from 'antd'
import './admin.css'
import { DeleteOutlined } from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
import adminAccount from '../../assets/images/adminAccount.svg'
import validator from 'validator'
import { homeApi } from '../../api'
import { troesAPi } from '../../api'

const Admin = () => {
  const [id, setId] = useState('')
  const [RowData, SetRowData] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [isadminShow, setisAdminShow] = useState(false)
  const [isadminDelete, setisAdminDelete] = useState(false)
  const [registerData, setRegisterData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [c_password, setConfirmPassword] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [userAdmit, setUserAdmit] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameError, setNameEroor] = useState('')
  const [conPassErr, setConPassError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [nameErrorUpdate, setNameEroorUpdate] = useState('')
  const [colorGreen, setColorGreen] = useState('')
  const [colorRed, setColorRed] = useState('')
  const [colorPink, setColorPink] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forData, setForData] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const validateEmail = () => {
    console.log(email, 'ooooo')
    if (validator.isEmail(email)) {
      setColorGreen('green')
      setEmailError('Valid Email!')
    } else {
      setColorGreen('red')
      setEmailError('Enter valid Email!')
    }
  }

  // useEffect(() => {

  // }, [email])

  const handleChange = (e) => {
    setEmail(e.target.value)
    validateEmail(email)
  }
  useEffect(() => {
    if (email) {
      validateEmail(email)
    }
  }, [email])

  const validate = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage('Strong Password!!')
      setColorRed('green')
      setCheckEmail(true)
    } else {
      setErrorMessage(
        'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)',
      )
      setCheckEmail(false)
      setColorRed('red')
    }
  }
  useEffect(() => {
    if (checkEmail === false) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [password, c_password, checkEmail])

  const validateName = (name) => {
    if (name.length >= 3) {
      setNameEroor('')
    } else {
      setNameEroor('Admin name must be between 3 and 25 characters.')
    }
  }

  const handleName = (e) => {
    setName(e.target.value)

    validateName(name)
  }
  useEffect(() => {
    if (name) {
      validateName(name)
    }
  }, [name])

  // useEffect(() => {

  // }, [])

  const handleConPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  useEffect(() => {
    const handleCPass = () => {
      if (password === c_password) {
        setConPassError('Correct password!!')
        setColorPink('green')
      } else {
        setConPassError('The password does not match!!')
        setColorPink('red')
      }
    }
    handleCPass()
    if (c_password == '') {
      setConPassError('')
    }
  }, [c_password, password])

  useEffect(() => {
    if (password == '') {
      setErrorMessage('')
    }
  }, [password])

  useEffect(() => {
    if (email == '') {
      setEmailError('')
    }
  }, [email])

  const handleNameUpdate = (e) => {
    setName(e.target.value)
    if (name.length <= 3) {
      setNameEroorUpdate('Admin name must be between 3 and 25 characters.')
    } else {
      setNameEroorUpdate('')
    }
  }
  useEffect(() => {
    if (name == '') {
      setNameEroorUpdate('')
    }
  }, [name])
  useEffect(() => {
    if (name == '') {
      setNameEroor('')
    }
  }, [name])

  const handleChangeed = (e) => {
    setPassword(e.target.value)

    validate(password)
  }

  useEffect(() => {
    if (password) {
      validate(password)
    }
  }, [password])

  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }
  const cancelCreate = (e) => {
    setIsShown((current) => !current)
  }
  const cancelCreateAdmin = (e) => {
    setisAdminShow((current) => !current)
  }

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setEmailError('')
    setDisabled(true)
    setConPassError('')
    setErrorMessage('')
  }, [isShown])
  useEffect(() => {
    setEmailError('')
    setDisabled(true)
    setConPassError('')
    setErrorMessage('')
  }, [isadminShow])

  async function signUp(e) {
    setLoading(true)
    setIsShown((current) => !current)
    e.preventDefault()

    //https://pwacrm.tentoptoday.com/public/api/register
    // setIsShown((current) => !current)

    const item = { name, email, password, c_password }

    if (name && email && password && password === c_password) {
      let result = await fetch(`${troesAPi}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      result = await result.json()

      if (!result.error) {
        setUserAdmit(true)
        setLoading(false)

        setTimeout(() => {
          setUserAdmit(false)
        }, 2000)

        getRegisterData()
      } else {
        alert(result.error.email)
        setLoading(false)
      }
    } else {
      alert('Invalid details')
      setLoading(false)
      setForData(false)
    }
  }

  const getRegisterData = (e) => {
    setLoading(true)
    // https://pwacrm.tentoptoday.com/public/api/admin
    axios
      .get(`${troesAPi}/admin`)
      .then((res) => {
        console.log(res, 'tt')
        setRegisterData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getRegisterData()
  }, [])
  const updateAdminID = (e, id) => {
    setisAdminShow((current) => !current)
  }
  useEffect(() => {
    setName(() => RowData.name)
    setEmail(() => RowData.email)
  }, [RowData])

  async function updateAdmin(e) {
    // e.preventDefault()
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/update/${id}
    //homeApi}/update/${id}
    setisAdminShow((current) => !current)

    if (name && email && password && password === c_password) {
      let result = await fetch(`${troesAPi}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ name, email, password, c_password }),
      })
      await result.json()
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      getRegisterData()
    } else {
      alert('Invalid Details')
      setLoading(false)
    }
  }

  const deleteAdmined = () => {
    setisAdminDelete((current) => !current)
  }

  const deleteAdmin = async (id) => {
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/pwa_user/${id}
    //${homeApi}/admin/
    setisAdminDelete((current) => !current)

    const response = axios
      .delete(`${troesAPi}/delete/${id}`)
      .then(() => {
        setDeleted((data) => !data)
        setUserDelete(true)
        setLoading(false)
        setTimeout(() => {
          setUserDelete(false)
        }, 2000)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getRegisterData()
  }, [deleted])

  const cancelDeleteAdmin = () => {
    setisAdminDelete((current) => !current)
  }

  return (
    <div className="admin__page" style={{ position: 'relative' }}>
      {/* <button onClick={forChecking}>click</button> */}
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <Spin size="large" style={{ fontSize: '30px' }} />
        </div>
      ) : (
        ''
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p className="admin__acount">Admin Accounts</p>
        <p className="toatl_adminss">Total Admins : {registerData.length}</p>
      </div>
      <div style={{ background: '#fff' }}>
        <div style={{ padding: '20px 20px' }}>
          <button
            onClick={handleClicked}
            style={{
              background: '#1890ff',
              color: '#fff',
              borderRadius: '15px',
              padding: '8px 15px',
              border: 'none',
              fontWeight: 'bold',
            }}
          >
            Register New Admin
            <img className="admin__black" src={adminAccount} alt="logo" />
          </button>
        </div>
      </div>

      <div
        className="show__notShow"
        style={{
          display: isShown ? 'block' : 'none',
        }}
      >
        <form onSubmit={signUp}>
          <div className="create_admin">
            <p>Create New Admin</p>
          </div>

          <div id="form__admin_ADMIN">
            <p className="nameEmail__admin" style={{ paddingTop: '20px' }}>
              Name
            </p>
            <input
              className="admin__input"
              type="text"
              name="name"
              value={name}
              placeholder="Enter Your Name"
              onChange={handleName}
            />
            {nameError ? (
              <div className="password__span">
                <span
                  style={{
                    fontWeight: '400',
                    color: 'red',
                    // paddingLeft: '20px',
                    // fontSize: '12px',
                  }}
                >
                  {nameError}
                </span>
              </div>
            ) : (
              ''
            )}
            <p className="nameEmail__admin">Email</p>
            <input
              className="admin__input"
              type="email"
              name="email"
              value={email}
              placeholder="Enter Your email"
              onChange={handleChange}
            />

            {emailError ? (
              <span
                id="email__error"
                style={{
                  fontWeight: '400',
                  color: `${colorGreen}`,
                  paddingLeft: '20px',
                  fontSize: '12px',
                }}
              >
                {emailError}
              </span>
            ) : (
              ''
            )}
            <p className="nameEmail__admin">Password</p>
            <input
              className="admin__input"
              type="password"
              name="password"
              value={password}
              placeholder=" password"
              onChange={handleChangeed}
            />

            {errorMessage ? (
              <div className="password__span">
                <span
                  style={{
                    fontWeight: '400',
                    color: `${colorRed}`,

                    fontSize: '12px',
                  }}
                >
                  {errorMessage}
                </span>
              </div>
            ) : (
              ''
            )}
            <p className="nameEmail__admin">Confirm Password</p>
            <input
              className="admin__input"
              type="password"
              name="c_password"
              value={c_password}
              placeholder="confirm password"
              onChange={handleConPassword}
            />

            {handleConPassword ? (
              <span
                style={{
                  fontWeight: '400',
                  color: `${colorPink}`,
                  paddingLeft: '20px',
                  fontSize: '12px',
                }}
              >
                {conPassErr}
              </span>
            ) : (
              ''
            )}

            <div style={{ paddingLeft: '10px' }}>
              <button
                type="submit"
                className="create_new__admin"
                onClick={signUp}
                disabled={disabled}
              >
                Create Admin
              </button>
              <Button onClick={cancelCreate} className="cancel__create" id="not_ShowCancel">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="show__notShow"
        style={{
          display: isadminShow ? 'block' : 'none',
        }}
      >
        <div className="create_admin">
          <p>Edit Admin Details</p>
        </div>

        <div id="form__admin_Edit">
          <p className="nameEmail__admin" style={{ paddingTop: '20px' }}>
            Name
          </p>
          <input
            className="admin__input"
            type="text"
            placeholder="Chetan"
            defaultValue={RowData.name}
            onChange={handleNameUpdate}
          />
          {nameErrorUpdate ? (
            <span
              style={{
                fontWeight: '400',
                color: 'red',
                paddingLeft: '20px',
                fontSize: '12px',
              }}
            >
              {nameErrorUpdate}
            </span>
          ) : (
            ''
          )}
          <p className="nameEmail__admin">Email</p>
          <input
            className="admin__input"
            type="email"
            defaultValue={RowData.email}
            onChange={handleChange}
            placeholder="cvinfotech@gmail.com"
          />
          {emailError ? (
            <span
              style={{
                fontWeight: '400',
                color: `${colorGreen}`,
                paddingLeft: '20px',
                fontSize: '12px',
              }}
            >
              {emailError}
            </span>
          ) : (
            ''
          )}
          <p className="nameEmail__admin">Password</p>
          <input
            className="admin__input"
            type="password"
            defaultValue={password}
            onChange={handleChangeed}
            placeholder="Generate a new password"
          />
          {errorMessage ? (
            <span
              style={{
                fontWeight: '400',
                color: `${colorRed}`,
                paddingLeft: '20px',
                fontSize: '12px',
              }}
            >
              {errorMessage}
            </span>
          ) : (
            ''
          )}
          <p className="nameEmail__admin">Confirm Password</p>
          <input
            id="conFirm_password"
            className="admin__input"
            type="password"
            placeholder="Retype new password to confirm"
            name="c_password"
            defaultValue={c_password}
            onChange={handleConPassword}
          />
          {handleConPassword ? (
            <span
              style={{
                fontWeight: '400',
                color: `${colorPink}`,

                paddingLeft: '20px',
                fontSize: '12px',
              }}
            >
              {conPassErr}
            </span>
          ) : (
            ''
          )}
          <div style={{ paddingLeft: '10px' }}>
            <button
              onClick={() => updateAdmin(id)}
              className="update_new__admin"
              disabled={disabled}
            >
              Update
            </button>
            <Button onClick={cancelCreateAdmin} className="cancel__create" type="submit">
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div
        className="show__notShow"
        style={{
          display: isadminDelete ? 'block' : 'none',
        }}
      >
        <div id="confirm__delete_Admin">
          <p>Confirm Delete</p>
        </div>
        <div id="delete__admin">
          <p>Are you sure you want to delete profile</p>
          <p style={{ marginTop: '-10px' }}>
            of the admin <span style={{ fontWeight: 'bolder' }}>{RowData.name}</span>
          </p>
          <p style={{ marginTop: '-10px' }}> This process is Irreversible</p>
          <div id="handle_Admin_Delete_cancel">
            <button onClick={() => deleteAdmin(id)} type="submit" className="delete_new__admin">
              Delete
            </button>
            <button onClick={cancelDeleteAdmin} id="delete__create" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="" style={{ marginTop: '10px', overflowX: 'auto' }}>
        <table className="table">
          <thead className="admin__information">
            <tr>
              <th className="s_Name">
                <Checkbox></Checkbox>
              </th>
              <th className="s_Name">Name</th>
              <th className="s_Name">Email</th>
              <th className="s_Name">Time</th>
              <th className="s_Name">Date</th>
              <th className="s_Name">Update</th>
              <th className="s_Name">Delete</th>
            </tr>
          </thead>

          <tbody style={{ background: '#fff' }}>
            {registerData &&
              registerData.map((item, index) => {
                function padTo2Digits(num) {
                  return num.toString().padStart(2, '0')
                }

                function formatDate(date) {
                  return [
                    padTo2Digits(date.getDate()),
                    padTo2Digits(date.getMonth() + 1),
                    date.getFullYear(),
                  ].join('-')
                }
                let numOfDaata = formatDate(new Date(item.pwa_date))
                return (
                  <tr key={index}>
                    <th>
                      <Checkbox></Checkbox>
                    </th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.time}</td>
                    <td>{numOfDaata}</td>

                    <td>
                      <button
                        onClick={() => {
                          updateAdminID(SetRowData(item), setId(item.id))
                        }}
                        className="update__table"
                      >
                        <img src={editPen} alt="edit" style={{ width: '20px' }} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delte__table"
                        onClick={() => deleteAdmined(SetRowData(item), setId(item.id))}
                      >
                        {/* <img src={deletePage} alt="delete" /> */}
                        <DeleteOutlined
                          style={{
                            color: 'red',
                            fontWeight: 'bolder',
                            fontSize: '18px',
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div
        className="user__detail__popup__Admin"
        style={{
          display: userAdmit ? 'block' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={adminAccount}
            alt="logo"
            style={{
              paddingRight: '10px',
              display: 'block',
              marginTop: '-5px',
              height: '15px',
              objectFit: 'contain',
            }}
          />
          <p className="admin_registerd__pop">A new admin is registered.</p>
        </div>
      </div>
      <div
        className="user__detail__popup__Admin"
        style={{
          display: userUpdate ? 'block' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={adminAccount}
            alt="logo"
            style={{
              paddingRight: '10px',
              display: 'block',
              marginTop: '-5px',
              objectFit: 'contain',
              height: '15px',
            }}
          />
          <p className="admin_registerd__pop">Admin details have been updated.</p>
        </div>
      </div>
      <div
        className="user__detail__popup__Admin"
        style={{
          display: userDelete ? 'block' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DeleteOutlined
            style={{
              display: 'block',
              color: '#fff',
              fontWeight: 'bolder',
              paddingRight: '10px',
              marginTop: '-5px',
              fontSize: '18px',
            }}
          />
          <p className="admin_registerd__pop">ID has been deleted.</p>
        </div>
      </div>
    </div>
  )
}

export default Admin

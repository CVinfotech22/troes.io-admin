import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Checkbox, Spin } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
import location_tag from '../../assets/images/location_tag.svg'
import { troesAPi } from '../../api'
import { useNavigate } from 'react-router-dom'
import './location.css'

const Location = () => {
  const [isShown, setIsShown] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isadminShow, setisAdminShow] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [id, setId] = useState('')
  const [isadminDelete, setisAdminDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [location, setLocation] = useState('')
  const [state, setState] = useState('')
  const [ZIP_code, setZipCode] = useState('')
  const [userAdmit, setUserAdmit] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const getLocationData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocationData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  async function signUp(e) {
    setLoading(true)
    setIsShown((current) => !current)
    e.preventDefault()

    const item = { location, state, ZIP_code }

    if (location && state && ZIP_code) {
      let result = await fetch(`${troesAPi}/locationregister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      result = await result.json()

      if (result.error) {
        alert('Location allready exists!!')
        setLoading(false)
      } else {
        setUserAdmit(true)
        setLoading(false)

        setTimeout(() => {
          setUserAdmit(false)
        }, 2000)

        getLocationData()
      }
    } else {
      alert('Invalid details')
      setLoading(false)
    }
  }

  useEffect(() => {
    setLocation('')
    setState('')
    setZipCode('')
  }, [isShown])
  async function updateAdmin(e) {
    // e.preventDefault()
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/update/${id}
    //homeApi}/update/${id}
    setisAdminShow((current) => !current)
    if (location && state && ZIP_code) {
      let result = await fetch(`${troesAPi}/locationupdate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ location, state, ZIP_code }),
      })
      await result.json()
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      getLocationData()
    } else {
      alert('Invalid details')
      setLoading(false)
    }
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }
  const cancelCreate = (e) => {
    setIsShown((current) => !current)
  }

  const updateAdminID = (e, id) => {
    setisAdminShow((current) => !current)
  }

  const cancelCreateAdmin = (e) => {
    setisAdminShow((current) => !current)
  }
  const deleteLocated = () => {
    setisAdminDelete((current) => !current)
  }
  const cancelDeleteLocation = () => {
    setisAdminDelete((current) => !current)
  }
  const deleteLocation = async (id) => {
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/pwa_user/${id}
    //${homeApi}/admin/
    setisAdminDelete((current) => !current)

    const response = axios
      .delete(`${troesAPi}/location/${id}`)
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
    getLocationData()
  }, [deleted])
  return (
    <>
      <div className="admin__page" style={{ position: 'relative' }}>
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
          <p className="location__acount">Location Management</p>
          <p className="total__location">Total Locations : {locationData.length}</p>
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
              Add New Location
              <img className="admin__black" src={location_tag} alt="logo" />
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
            <div id="create_Location">
              <p>Add new location</p>
            </div>

            <div id="form__admin__locate">
              <p className="nameEmail__Location" style={{ paddingTop: '20px' }}>
                Location Name
              </p>
              <input
                className="locate__input"
                type="text"
                name="location"
                value={location}
                placeholder="Ex. Submarine Base"
                onChange={(e) => setLocation(e.target.value)}
              />

              <p className="nameEmail__Location">State</p>
              <input
                className="locate__input"
                type="text"
                name="state"
                value={state}
                placeholder="Ex. New London"
                onChange={(e) => setState(e.target.value)}
              />

              <p className="nameEmail__Location">Zip Code</p>
              <input
                className="locate__input"
                type="number"
                name="ZIP_code"
                value={ZIP_code}
                placeholder=" 111222"
                onChange={(e) => setZipCode(e.target.value)}
              />

              <div className="locate_side" style={{ paddingLeft: '10px' }}>
                <button
                  type="submit"
                  className="create_new__location"
                  onClick={signUp}
                  // disabled={disabled}
                >
                  Add
                </button>
                <Button
                  onClick={cancelCreate}
                  className="cancel__create__location"
                  id="not_ShowCancel"
                >
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
          <div id="create_Location__edit">
            <p>Edit location</p>
          </div>

          <div id="form__admin__update">
            <p className="nameEmail__Location" style={{ paddingTop: '20px' }}>
              Location Name
            </p>
            <input
              className="locate__input"
              type="text"
              name="location"
              value={location}
              placeholder="Ex. Submarine Base"
              onChange={(e) => setLocation(e.target.value)}
            />

            <p className="nameEmail__Location">State</p>
            <input
              className="locate__input"
              type="text"
              name="state"
              value={state}
              placeholder="Ex. New London"
              onChange={(e) => setState(e.target.value)}
            />

            <p className="nameEmail__Location">Zip Code</p>
            <input
              className="locate__input"
              type="number"
              name="ZIP_code"
              value={ZIP_code}
              placeholder=" 111222"
              onChange={(e) => setZipCode(e.target.value)}
            />

            <div className="locate_side" style={{ paddingLeft: '10px' }}>
              <button
                type="submit"
                className="create_new__location"
                onClick={() => updateAdmin(id)}
                // disabled={disabled}
              >
                Update
              </button>
              <Button
                onClick={cancelCreateAdmin}
                className="cancel__create__location"
                id="not_ShowCancel"
              >
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
          <div id="confirm__delete_location">
            <p>Confirm Delete</p>
          </div>
          <div id="delete__Location">
            <p>Are you sure you want to delete location</p>
            <p style={{ marginTop: '-10px' }}>
              <span style={{ fontWeight: 'bolder' }}>{RowData.location}</span>
            </p>
            <p style={{ marginTop: '-10px' }}> This process is Irreversible</p>
            <div style={{ paddingLeft: '10px' }}>
              <button
                onClick={() => deleteLocation(id)}
                type="submit"
                className="delete_new__admin"
              >
                Delete
              </button>
              <button
                onClick={cancelDeleteLocation}
                className="cancel__create__location"
                type="submit"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="" style={{ marginTop: '10px', overflowX: 'auto' }}>
          <table className="table">
            <thead className="location__information">
              <tr>
                <th className="t_Name">S.No.</th>
                <th className="t_Name">Location</th>
                <th className="t_Name">State</th>
                <th className="t_Name">Zip Code</th>
                <th className="t_Name">Date</th>
                <th className="t_Name">Update</th>
                <th className="t_Name">Delete</th>
              </tr>
            </thead>

            <tbody style={{ background: '#fff' }}>
              {locationData &&
                locationData.map((item, index) => {
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
                      <th>{index + 1}</th>
                      <td>{item.location}</td>
                      <td>{item.state}</td>
                      <td>{item.ZIP_code}</td>
                      <td>{numOfDaata}</td>

                      <td>
                        <button
                          onClick={() => {
                            setLocation(item.location)
                            setState(item.state)
                            setZipCode(item.ZIP_code)
                            updateAdminID(SetRowData(item), setId(item.id))
                          }}
                          className="update__Location"
                        >
                          <img src={editPen} alt="edit" style={{ width: '20px' }} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete__Location__of"
                          onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
                        >
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
          className="user__detail__popup__location"
          style={{
            display: userAdmit ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={location_tag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                height: '15px',
                objectFit: 'contain',
              }}
            />
            <p className="admin_registerd__pop">New location added successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__location"
          style={{
            display: userUpdate ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={location_tag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="admin_registerd__pop">Location information updated.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__location"
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
            <p className="admin_registerd__pop">Location has been deleted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Location

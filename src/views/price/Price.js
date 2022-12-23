import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Spin } from 'antd'
import axios from 'axios'

import editPen from '../../assets/images/editPen.svg'
import ep_pricetag from '../../assets/images/ep_pricetag.svg'
import { useNavigate } from 'react-router-dom'
import { troesAPi } from '../../api'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import './price.css'

const Price = () => {
  const [isShown, setIsShown] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [plans, setPlanData] = useState([])

  const [loading, setLoading] = useState(false)
  const [isadminShow, setisAdminShow] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [id, setId] = useState('')

  const [errorlocation, setLocationError] = useState('')
  const [errorkwh, setKwhError] = useState('')
  const [errormiq, setMiqError] = useState('')

  const [errorpackage, setPackageError] = useState('')
  const [errorprice, setPriceError] = useState('')
  const [errordollar, setDollarError] = useState('')
  const [isadminDelete, setisAdminDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [package_name, setPackgagename] = useState('')
  const [mi_eq, setMieq] = useState('')
  const [kwh, setKwh] = useState('')
  const [dollar_mi, setDollar] = useState('')
  const [total_price, setPrice] = useState('')

  const [location, setLocation] = useState('')

  const [location_id, setLocation_id] = useState('')
  const [forSelect, setForSelect] = useState(false)
  const [userAdmit, setUserAdmit] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])
  console.log(dollar_mi, 'kkk')

  const handleSelect = (e) => {
    setLoading(true)
    setForSelect(true)

    setLocation(e.target.value)

    setLocation_id(e.target.selectedOptions[0].getAttribute('data-name'))
    //alert(e.target.selectedOptions[0].getAttribute('data-name'))

    axios
      .get(
        `${troesAPi}/pricedetails?location=${e.target.selectedOptions[0].getAttribute(
          'data-name',
        )}`,
      )
      .then((res) => {
        setPlanData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)

        setForSelect(false)
      })
  }

  const getPlanData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/pricedetails?location=${location_id}`)
      .then((res) => {
        // console.log(res.data.customers, 'ggg')
        setPlanData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getPlanData()
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

    setLocationError('')
    setKwhError('')
    setMiqError('')
    setPackageError('')
    setPriceError('')

    if (location == '') setLocationError('Please select location')
    if (kwh == '') setKwhError('Please enter value')
    if (mi_eq == '') setMiqError('Please enter value')
    if (package_name == '') setPackageError('Please enter value')
    if (total_price == '') setPriceError('Please enter value')
    if (dollar_mi == '') setDollarError('Please enter value')

    const item = { location, package_name, mi_eq, kwh, total_price, location_id, dollar_mi }

    if (package_name && dollar_mi && mi_eq && kwh && total_price && location) {
      let result = await fetch(`${troesAPi}/price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      // result = await result.json()

      setUserAdmit(true)
      setLoading(false)

      setTimeout(() => {
        setUserAdmit(false)
      }, 2000)

      getPlanData()
    } else {
      setIsShown(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    setDollar('')
    setMieq('')
    setKwh('')
    setPackgagename('')
    setPrice('')
  }, [isShown])

  async function updateAdmin(e) {
    setLoading(true)

    setisAdminShow((current) => !current)
    if (package_name && mi_eq && kwh && total_price && dollar_mi) {
      let result = await fetch(`${troesAPi}/priceupdate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ package_name, mi_eq, kwh, total_price, dollar_mi }),
      })
      await result.json()
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      getPlanData()
    } else {
      alert('invalid details')
      setLoading(false)
    }
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }

  useEffect(() => {
    const handleLength = () => {
      let planned = plans.length

      if (planned < 3) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    handleLength()
  }, [plans, deleted])
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
    setisAdminDelete((current) => !current)

    const response = axios
      .delete(`${troesAPi}/price/${id}`)
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
    getPlanData()
  }, [deleted])
  console.log(location_id, 'pooppo')

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
          <p className="price__acount">Price Management</p>
        </div>
        <div style={{ background: '#fff' }}>
          <div style={{ padding: '20px 20px' }}>
            <Button
              disabled={disabled}
              onClick={handleClicked}
              style={{
                background: '#1890ff',
                color: '#fff',
                borderRadius: '15px',
                padding: '5px 15px',
                border: 'none',
                fontWeight: 'bold',
              }}
            >
              Add New Plan
              <img className="admin__black" src={ep_pricetag} alt="logo" />
            </Button>

            <br />
            {disabled ? (
              <p style={{ color: 'red', paddingLeft: '5px' }}>
                Only three packages per location are allowed.
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div
          className="show__notShow"
          style={{
            display: isShown ? 'block' : 'none',
          }}
        >
          <form onSubmit={signUp}>
            <div className="create_Location__packag">
              <p>Add new package</p>
            </div>

            <div id="add__Item">
              <p className="nameEmail__Price">Location Name</p>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                readOnly={true}
                value={location}
              />
              {/* <p className="nameEmail__Price">Location Id</p> */}
              <input
                className="locate__input"
                type="hidden"
                name=""
                id=""
                readOnly={true}
                value={location_id}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorlocation}</span>
              <p className="nameEmail__Price">Stripe Product Name</p>
              <input
                className="locate__input"
                type="text"
                name="package_name"
                value={package_name}
                placeholder="Eg. Base Package - 4"
                onChange={(e) => setPackgagename(e.target.value)}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorpackage}</span>

              <p className="nameEmail__Price">kWh</p>
              <input
                className="locate__input"
                type="number"
                name="kwh"
                value={kwh}
                placeholder="kWh"
                onChange={(e) => setKwh(e.target.value)}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorkwh}</span>

              <p className="nameEmail__Price">Mi Eq</p>
              <input
                className="locate__input"
                type="number"
                name="mi_eq"
                value={mi_eq}
                placeholder="Eg. 2000"
                onChange={(e) => setMieq(e.target.value)}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errormiq}</span>

              <p className="nameEmail__Price">$/Mi</p>
              <input
                className="locate__input"
                type="number"
                name="dollar_mi"
                value={dollar_mi}
                placeholder="Eg. 2000"
                onChange={(e) => setDollar(e.target.value)}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errordollar}</span>
              <p className="nameEmail__Price">Total Price/month</p>
              <input
                className="locate__input"
                type="number"
                name="price"
                value={total_price}
                placeholder="Eg.$149"
                onChange={(e) => setPrice(e.target.value)}
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorprice}</span>
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
          <div className="create_Location__edit_one">
            <p>Edit Plan</p>
          </div>

          <div id="form__admin__Price" style={{ marginTop: '100px' }}>
            <p className="nameEmail__Price">Location Name</p>
            <input
              type="text"
              name=""
              id=""
              readOnly={true}
              value={location}
              className="locate__input"
            />
            <span style={{ color: 'red', paddingLeft: '11px' }}>{errorlocation}</span>
            <p className="nameEmail__Price">Package Name</p>
            <input
              className="locate__input"
              type="text"
              name="package_name"
              value={package_name}
              placeholder="Eg. Base Package - 4"
              onChange={(e) => setPackgagename(e.target.value)}
            />

            <p className="nameEmail__Price">kWh</p>
            <input
              className="locate__input"
              type="number"
              name="kwh"
              value={kwh}
              placeholder="kWh"
              onChange={(e) => setKwh(e.target.value)}
            />

            <p className="nameEmail__Price">Mi Eq</p>
            <input
              className="locate__input"
              type="number"
              name="mi_eq"
              value={mi_eq}
              placeholder="Eg. 2000"
              onChange={(e) => setMieq(e.target.value)}
            />
            <p className="nameEmail__Price">$/Mi</p>
            <input
              className="locate__input"
              type="number"
              name="dollar_mi"
              value={dollar_mi}
              placeholder="Eg. 2000"
              onChange={(e) => setDollar(e.target.value)}
            />

            <p className="nameEmail__Price">Total Price/month</p>
            <input
              className="locate__input"
              type="number"
              name="price"
              value={total_price}
              placeholder="Eg.$149"
              onChange={(e) => setPrice(e.target.value)}
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
          <div className="confirm__delete">
            <p>Confirm Delete</p>
          </div>
          <div className="delete__admin">
            <p>Are you sure you want to delete the location</p>
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

        <div className="">
          <div className="location_wrapper">
            <label className="for_respn" style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Select Location:
            </label>
            <select id="option__value" onChange={handleSelect}>
              <option value="">Select Location</option>
              {locationData &&
                locationData.map((item, index) => {
                  return (
                    <option key={index} data-name={item.id} value={item.location}>
                      {item.location}
                    </option>
                  )
                })}
            </select>
            <br />
            {forSelect ? '' : <span className="plezz_select">Please select location</span>}
          </div>

          <div className="upper">
            {plans &&
              plans.map((item, index) => {
                console.log(item, 'kkkk')
                return (
                  <div className="upper_middle" key={index}>
                    <div className="for_box_shadow">
                      <div className="middle_div">
                        <div className="mddlee_upper">
                          <div className="line_kwh">
                            <p className="all_kwH">kWh</p>
                            <p className="all_kwH">{item.kwh}</p>
                          </div>
                          <div className="line_kwh">
                            <p className="all_kwH">Mi Eq</p>
                            <p className="all_kwH">~{item.mi_eq}</p>
                          </div>
                          <div className="line_kwh">
                            <p className="all_kwH">$/Mi</p>
                            <p className="all_kwH">{item.dollar_mi}</p>
                          </div>
                        </div>
                        <div className="middle_Midle">
                          <p style={{ fontWeight: '500', fontSize: '14px' }}>{item.location}</p>
                        </div>
                        <div className="middle__price">
                          <p>{item.package_name}</p>
                        </div>
                        <br />

                        <hr style={{ width: '95%', margin: 'auto' }} />
                        <div className="bottom__toTal">
                          <p className="mont_Total">Total: ${item.total_price} /month</p>
                        </div>
                      </div>
                    </div>

                    <div className="ekdam__bttom">
                      <p>{item.package_name}</p>
                    </div>
                    <div className="bottom__upate">
                      <button
                        onClick={() => {
                          setPrice(item.total_price)
                          setPackgagename(item.package_name)
                          setDollar(item.dollar_mi)
                          setKwh(item.kwh)
                          setMieq(item.mi_eq)
                          updateAdminID(SetRowData(item), setId(item.id))
                        }}
                        style={{ border: 'none', paddingRight: '18px', background: 'none' }}
                      >
                        <img src={editPen} alt="edit" style={{ width: '20px' }} />
                      </button>
                      <button
                        onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
                        style={{ border: 'none', background: 'none' }}
                      >
                        <DeleteOutlined
                          style={{
                            color: 'red',
                            fontWeight: 'bolder',
                            fontSize: '18px',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                )
              })}

            <div className="bottom_border">
              <Button
                disabled={disabled}
                onClick={handleClicked}
                style={{ border: 'none', background: 'none' }}
              >
                <PlusOutlined
                  style={{ color: '#b1d34f', fontSize: '30px', fontWeight: 'bolder' }}
                />
              </Button>
              <p style={{ paddingTop: '5px' }}>Add new plan</p>
            </div>
          </div>
        </div>
        <div
          className="user__detail__popup__Price"
          style={{
            display: userAdmit ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={ep_pricetag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                height: '15px',
                objectFit: 'contain',
              }}
            />
            <p className="admin_registerd__pop">New package added successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Price"
          style={{
            display: userUpdate ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={ep_pricetag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="admin_registerd__pop">Package information updated.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Price"
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
            <p className="admin_registerd__pop">Package has been deleted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Price

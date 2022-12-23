import axios from 'axios'

import React, { useState } from 'react'
import { useEffect } from 'react'

import {
  DeleteOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  FilterFilled,
  PlusOutlined,
  CloseOutlined,
  DeleteFilled,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, InputNumber, Table, Tooltip, Radio, Space, Spin, Modal } from 'antd'

import FrameOne from '../../assets/images/FrameOne.svg'
import Frame from '../../assets/images/Frame.svg'
import FrameTwo from '../../assets/images/FrameTwo.svg'

import './Customer.css'

import { troesAPi } from '../../api'
import { useNavigate, Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { color } from '@mui/system'
import { alertClasses } from '@mui/material'

const Customer = () => {
  const [isShown, setIsShown] = useState(false)

  const [total, setTotal] = useState('')

  const [page, setPage] = useState(1)

  const [data, setData] = useState([])

  const [postPerPage, setPostPerPage] = useState(10)

  const [deleted, setDeleted] = useState(false)
  const [forRadioDelete, setForRadioDelete] = useState(false)
  const [installation, setInstallation] = useState(false)
  const [planData, setPlanData] = useState(false)
  const [priceData, setPriceData] = useState(false)
  const [order, setOrder] = useState('ASC')

  const [dataValue, setDataValue] = useState()
  const [clearData, setclearData] = useState(false)
  const [basePackage, setBasePackage] = useState()
  const [basePrice, setBasePrice] = useState(0)

  const [dataAntd, setDataAntd] = useState([])
  const [loading, setLoading] = useState(false)
  const [userDelete, setUserDelete] = useState(false)
  const [userSuspend, setUserSuspend] = useState(false)

  const [value, setValue] = useState(0)
  const [planValue, setPlanValue] = useState(0)
  const [activeData, setActiveData] = useState('')
  const [locateData, setLocateData] = useState([])

  const [radioValue, setRadioValue] = useState('')

  const [package_plan, setPackagePlan] = useState('')
  const [forRefreshing, setForRefreshing] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [forSuspend, setForSuspend] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const showModal = () => {
    setIsModalOpen(true)
    setIsShown((current) => !current)
  }
  const handleOk = async (e) => {
    setIsModalOpen(false)
    e.preventDefault()

    if (package_plan) {
      let result = await fetch(`${troesAPi}/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ package_plan }),
      })
      setForRefreshing((data) => !data)
      console.log(result)

      setPackagePlan('')
    } else {
      setLoading(false)
    }
  }
  useEffect(() => {
    viewsPlan()
  }, [forRefreshing])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const campaignActivity = () => {
    document.getElementById('campaign_activity').style.backgroundColor = '#0c2556'
    document.getElementById('campaign_activity').style.color = '#fff'
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    setInstallation(true)
  }

  const location = () => {
    document.getElementById('location').style.backgroundColor = '#0c2556'
    document.getElementById('location').style.color = '#fff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    setPlanData(true)
  }

  const priceHandle = () => {
    document.getElementById('price_handle').style.backgroundColor = '#0c2556'
    document.getElementById('price_handle').style.color = '#fff'
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    setPriceData(true)
  }
  const onChangeed = (value) => {
    setBasePrice(value)
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }

  const clearFilter = () => {
    setInstallation(false)
    setPlanData(false)
    setBasePackage(null)
    setBasePrice(0)
    setPriceData(false)
    setDataValue(null)
    setPlanValue(0)
    setValue(0)
    document.getElementById('location').style.backgroundColor = '#1890ff'

    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/pwa_user`)

      .then((res) => {
        if (res.status === 200) {
          const nbaData = res?.data.customers
          setDataAntd(res.data.customers)
          setData(res.data.customers)
          setActiveData(res.data.customers)
          setTotal(nbaData.length)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = data.slice(indexOfFirstPage, indexOfLastPage)
  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize)
  }
  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>
    }
    if (type === 'next') {
      return <a>Next</a>
    }
    return originalElement
  }

  const onDeleteUser = async (id) => {
    setLoading(true)

    if (window.confirm('Are you sure? The Account will get deleted permanently!!')) {
      const response = axios
        .delete(`${troesAPi}/pwa_user/${id}`)
        .then(() => {
          setDeleted((data) => !data)
          setLoading(false)
          setUserDelete(true)

          setTimeout(() => {
            setUserDelete(false)
          }, 10000)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [deleted])

  const searchHandle = async (e) => {
    setLoading(true)
    var valueToPush = {}
    if (value != 0) {
      valueToPush['pwa_choice'] = value
    }
    if (planValue != 0) {
      valueToPush['energy_plan'] = planValue
    }
    if (basePrice != 0) {
      valueToPush['energy_price'] = basePrice
    }
    console.log(valueToPush, 'vvalal')
    let key = e.target.value
    if (key !== '') {
      valueToPush['key'] = key
    }
    console.log(valueToPush, 'push')
    axios({
      url: `${troesAPi}/filter1`,
      method: 'post',

      data: valueToPush,
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const applyFilter = async (e) => {
    setLoading(true)
    setIsShown((current) => !current)
    e.preventDefault()

    if (value !== 0 || planValue !== 0 || basePrice !== 0) {
      setLoading(true)
      var valueToPush = {}
      if (value != 0) {
        valueToPush['pwa_choice'] = value
      }
      if (planValue != 0) {
        valueToPush['energy_plan'] = planValue
      }
      if (basePrice != 0) {
        valueToPush['energy_price'] = basePrice
      }

      document.getElementById('handle__addFilter').style.background = '#0c2556'
      setclearData(true)

      axios({
        url: `${troesAPi}/filter1`,
        method: 'post',

        data: valueToPush,
      })
        .then(function (response) {
          setData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      setLoading(false)
      // alert('No filter applied')
    }
  }
  const totalUsers = activeData.length

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1,
      )

      setData(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1,
      )
      setData(sorted)
      setOrder('ASC')
    }
  }

  const clearFiltererd = () => {
    document.getElementById('handle__addFilter').style.background = '#1890ff'
    setclearData(false)
    setValue(0)
    setPlanValue(0)

    setBasePrice(0)

    getUsers()
  }

  const onChangePlan = (e) => {
    setValue(e.target.value)
  }

  const RadioPlan = (e) => {
    setValue(!e.target.checked)
  }

  const onChangeBase = (e) => {
    setPlanValue(e.target.value)
  }

  const RadioBase = (e) => {
    setclearData(false)

    setPlanValue(!e.target.checked)
  }

  const registerdAccount = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/registered`)
      .then((res) => {
        setData(res.data.customers)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const activeAccount = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/active`)
      .then((res) => {
        setData(res.data.customers)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const inActivee = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/nonactive`)
      .then((res) => {
        setData(res.data.customers)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const AccountSuspended = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/suspended`)
      .then((res) => {
        setData(res.data.customers)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const getLocationData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocateData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  // const dynamicRadion = async (e) => {
  //   e.preventDefault()

  //   if (package_plan) {
  //     let result = await fetch(`${troesAPi}/plan`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  //       body: JSON.stringify({ package_plan }),
  //     })
  //     console.log(result)

  //     setPackagePlan('')
  //     setForRefreshing(true)
  //   } else {
  //     setForRefreshing(false)
  //   }
  // }
  const viewsPlan = () => {
    axios
      .get(`${troesAPi}/plan_package`)
      .then((res) => {
        setRadioValue(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onDeleteRadio = async (id, e) => {
    // e.preventDefault()
    if (window.confirm('Are you sure? ')) {
      const response = axios
        .delete(`${troesAPi}/planpackage/${id}`)
        .then(() => {
          setForRadioDelete((data) => !data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    viewsPlan()
  }, [forRadioDelete])
  const handlePagination = (value) => {
    setPage(value)
  }
  let pwa_status = 0
  let energy_plan = null
  let energy_price = null
  const onSuspendUser = async (id) => {
    if (window.confirm('Are you sure? The Account will get suspended permanently!!')) {
      let result = await fetch(`${troesAPi}/suspend/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ pwa_status, energy_plan, energy_price }),
      })
      console.log(result, 'res')
      setForSuspend((data) => !data)
      setUserSuspend(true)

      setTimeout(() => {
        setUserSuspend(false)
      }, 10000)
    }
  }
  useEffect(() => {
    getUsers()
  }, [forSuspend])
  return (
    <>
      <div className="container-fluid customer_information" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="all_customer_of_page">All Customers</h2>
          <p style={{ paddingBottom: '18px', textAlign: 'center' }}>
            Total Customers : {totalUsers} <br />
            <Link to="/">
              <span
                style={{
                  textAlign: 'center',
                  color: 'blue',
                  borderBottom: '1px solid blue',
                }}
              >
                All Customers
              </span>
            </Link>
          </p>
        </div>

        <div className="search_heading" style={{ position: 'relative' }}>
          <div className="add_nine">
            <input
              type="text"
              className="search_text"
              placeholder="Search...."
              onChange={searchHandle}
              style={{ background: '#fff' }}
            />
            <div className="uI_hndle">
              <Button id="handle__addFilter" type="primary" onClick={handleClicked}>
                <FilterFilled
                  style={{
                    color: '#fff',

                    fontSize: '20px',
                    fontWeight: 'bolder',
                    display: 'block',
                    float: 'left',
                  }}
                />
                Add Filter
              </Button>
              {clearData ? (
                <Button className="for_Filter_Clear" onClick={clearFiltererd}>
                  <DeleteFilled
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bolder',
                      display: 'block',
                      float: 'left',
                      color: '#fff',
                      marginTop: '-2px',
                    }}
                  />
                  Clear Filter
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="filter__Active">
            {/* <table className="table__inline">
              <tr>
                <td
                  style={{
                    width: '10px',
                    float: 'right',
                    textAlign: 'center',
                  }}
                >
                  <div className="for__rounding"></div>
                </td>
                <td>
                  <button className="for_btn_Account">Accounts</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="for_Active_inactive"
                    style={{
                      backgroundColor: 'blue',
                    }}
                  />
                </td>
                <td>
                  <button className="btn_for_Link" onClick={registerdAccount}>
                    Registered
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="for_Active_inactive"
                    style={{
                      backgroundColor: 'green',
                    }}
                  />
                </td>
                <td>
                  <button className="btn_for_Link" onClick={activeAccount}>
                    Active
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="for_Active_inactive"
                    style={{
                      backgroundColor: 'yellow',
                    }}
                  />
                </td>
                <td>
                  <button className="btn_for_Link" onClick={inActivee}>
                    In-active
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="for_Active_inactive"
                    style={{
                      backgroundColor: 'red',
                    }}
                  />
                </td>
                <td>
                  <button className="btn_for_Link" onClick={AccountSuspended}>
                    Suspended
                  </button>
                </td>
              </tr>
            </table> */}

            <div className="forAlignment_Account">
              <div className="forChanging_color" style={{ background: 'blue' }}></div>
              <button className="btn_for_Link" onClick={registerdAccount}>
                Registered
              </button>
            </div>
            <div className="forAlignment_Account">
              <div
                className="forChanging_color"
                style={{
                  background: 'green',
                }}
              ></div>
              <button className="btn_for_Link" onClick={activeAccount}>
                Active
              </button>
            </div>
            <div className="forAlignment_Account">
              <div
                className="forChanging_color"
                style={{
                  background: 'yellow',
                }}
              ></div>
              <button className="btn_for_Link" onClick={inActivee}>
                In-active
              </button>
            </div>
            <div className="forAlignment_Account">
              <div className="forChanging_color" style={{ background: 'red' }}></div>
              <button className="btn_for_Link" onClick={AccountSuspended}>
                Suspended
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1000',
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}
        <div
          className="for_respon__modal"
          style={{
            display: isShown ? 'block' : 'none',
          }}
        >
          <form onSubmit={applyFilter}>
            <div className="add__one">
              <span className="add_filter_1">
                Add Filter
                <ArrowRightOutlined style={{ fontSize: '16px' }} />
              </span>
              <br />

              <div className="add__three">
                <p>Find the Users you are looking for : </p>
                <div className="for__marginn">
                  <Button
                    id="campaign_activity"
                    onClick={campaignActivity}
                    className="for_campaign_act"
                  >
                    <img src={FrameTwo} alt="frame" className="for_img_two" />
                    Location
                  </Button>
                  <Button id="location" onClick={location} className="for_campaign_act">
                    <img src={FrameOne} alt="frame" className="for__plan_hand" />
                    Plan
                  </Button>
                  <Button id="price_handle" onClick={priceHandle} className="for__price_hand">
                    <img src={Frame} alt="frame" className="for_img_two" />
                    Price
                  </Button>
                </div>
              </div>
              <hr style={{ width: '80%', margin: 'auto' }} />
              {installation || planData || priceData ? (
                ''
              ) : (
                <div className="add__four">
                  <p>
                    <MinusOutlined className="minus_outlined_one" />
                    No Filters applied
                  </p>
                  <p>Add one of the above filters to narrow down your User list</p>
                </div>
              )}
              {installation ? (
                <div className="add_five">
                  <div className="add__eleven">
                    <span className="add__forteen">Location</span>
                    <Radio.Group onChange={onChangePlan} value={value} className="base_PP2">
                      {locateData.map((item, index) => {
                        return (
                          <Radio key={index} value={item.location} id="amul">
                            <p id=""> {item.location}</p>
                          </Radio>
                        )
                      })}
                    </Radio.Group>
                  </div>
                  <span className="plan__uncheck_one" onClick={RadioPlan}>
                    <CloseOutlined />
                  </span>
                </div>
              ) : (
                ''
              )}
              {installation ? (
                <div>
                  <hr style={{ width: '35%', margin: 'auto' }} />
                </div>
              ) : (
                ''
              )}

              {planData ? (
                <div className="add__eight">
                  <div className="add_twelve">
                    <span className="add__sixx">Plan</span>
                    <div className="add_twenty">
                      <Radio.Group onChange={onChangeBase} value={planValue} className="base_yy2">
                        {radioValue.map((item, index) => {
                          return (
                            <Radio key={index} value={item.package_plan} id="amul">
                              <div
                                style={{
                                  display: 'flex',
                                }}
                              >
                                <p id=""> {item.package_plan}</p>
                                <p
                                  className="delete_outline_one"
                                  onClick={() => onDeleteRadio(item.id)}
                                >
                                  <DeleteOutlined />
                                </p>
                              </div>
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                      <div className="for__margin__two" style={{ zIndex: '2' }}>
                        <Modal
                          title="Add Plan"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <input
                            onChange={(e) => setPackagePlan(e.target.value)}
                            type="text"
                            name="package_plan"
                            id=""
                            value={package_plan}
                            className="package__plan"
                            placeholder="Add a Package"
                          />
                        </Modal>
                        <button className="dynamic__button" onClick={showModal}>
                          <PlusOutlined className="plus__outlined" />
                        </button>

                        <span className="plan__uncheck" onClick={RadioBase}>
                          <CloseOutlined />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {planData ? (
                <div>
                  <hr style={{ width: '35%', margin: 'auto' }} />
                </div>
              ) : (
                ''
              )}
              {priceData ? (
                <div className="price__div">
                  <p className="main_div_of_pric">Price</p>

                  <InputNumber
                    id="basePrice"
                    type="number"
                    min={1}
                    value={basePrice}
                    max={10000}
                    defaultValue={0}
                    onChange={onChangeed}
                    style={{ marginLeft: '80px', width: '120px' }}
                  />
                </div>
              ) : (
                ''
              )}

              <div className="mainDivOf_apply">
                <button className="sub_divOf_Appli" id="apply__filter">
                  <FilterFilled className="filter_outlined" />
                  Apply Filter
                </button>

                <Button onClick={clearFilter} className="claer_filter">
                  <DeleteOutlined className="delete_outlinedd" />
                  Clear Filter
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="customer_wrapper">
          <table className="table">
            <thead style={{ color: '#fff' }}>
              <tr>
                <th className="styl_Font" scope="col">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{
                      appearance: 'none',
                      backgroundColor: 'white',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                    }}
                  />
                </th>

                <th onClick={() => sorting('pwa_name')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Name</div>
                    </Tooltip>
                  </div>
                </th>

                <th onClick={() => sorting('pwa_email')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Email</div>
                    </Tooltip>
                  </div>
                </th>
                <th onClick={() => sorting('pwa_add1')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Address</div>
                    </Tooltip>
                  </div>
                </th>
                <th onClick={() => sorting('pwa_state')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      paddingLeft: '10px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>State</div>
                    </Tooltip>
                  </div>
                </th>

                <th onClick={() => sorting('pwa_choice')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      paddingLeft: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Installation</div>
                    </Tooltip>
                  </div>
                </th>
                <th className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      paddingLeft: '5px',
                    }}
                  >
                    <div>Plan</div>
                  </div>
                </th>
                <th className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      paddingLeft: '10px',
                    }}
                  >
                    <div>Price</div>
                  </div>
                </th>
                <th onClick={() => sorting('pwa_mobile')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div> Mobile</div>
                    </Tooltip>
                  </div>
                </th>
                <th onClick={() => sorting('pwa_date')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Date</div>
                    </Tooltip>
                  </div>
                </th>
                <th onClick={() => sorting('time')} className="styl_Font" scope="col">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Tooltip title="Click To Sort">
                      <div>Time</div>
                    </Tooltip>
                  </div>
                </th>
                <th className="styl_Font" scope="col">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="tbody_clr">
              {currentPosts &&
                currentPosts.map((item, index) => {
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
                  let color
                  if (
                    item.pwa_status === 0 &&
                    item.energy_plan === null &&
                    item.energy_price === null
                  ) {
                    color = 'red'
                  } else if (item.energy_plan && item.energy_price !== null) {
                    color = 'green'
                  } else if (
                    item.energy_plan === null &&
                    item.energy_price === null &&
                    item.pwa_status === 1
                  ) {
                    color = 'yellow'
                  } else {
                    color = 'blue'
                  }

                  return (
                    <tr key={index}>
                      <th>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          style={{
                            appearance: 'none',
                            backgroundColor: `${color}`,
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                          }}
                        />
                      </th>

                      <td>{item?.pwa_name}</td>
                      <td>{item?.pwa_email}</td>
                      <td>
                        {item?.pwa_add1},{item?.pwa_add2} {item?.pwa_zip}
                      </td>
                      <td>{item?.pwa_state}</td>

                      <td>{item?.pwa_choice}</td>
                      <td>{item?.energy_plan ? item?.energy_plan : ' - '}</td>
                      <td>{item?.energy_price ? '$' + item?.energy_price / 100 : ' - '}</td>
                      <td>{item?.pwa_mobile}</td>
                      <td>{numOfDaata}</td>

                      <td>{item?.time}</td>
                      <td>
                        {item.pwa_status === 0 &&
                        item.energy_plan === null &&
                        item.energy_price === null ? (
                          ''
                        ) : (
                          <button
                            className=""
                            style={{ paddingLeft: '9px', color: 'red' }}
                            onClick={() => onSuspendUser(item.id)}
                          >
                            <StopOutlined />
                          </button>
                        )}
                        <button
                          className=""
                          style={{ paddingLeft: '8px', color: 'red' }}
                          onClick={() => onDeleteUser(item.id)}
                        >
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <div
          className="user__detail__popup__Customer"
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
            <p className="admin_registerd__pop">User has been deleted.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: userSuspend ? 'block' : 'none',
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
            <p className="admin_registerd__pop">A User has been Suspended.</p>
          </div>
        </div>
      </div>

      <Pagination
        onChange={handlePagination}
        pageSize={postPerPage}
        total={total}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
        style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'flex-start' }}
      />
    </>
  )
}

export default Customer

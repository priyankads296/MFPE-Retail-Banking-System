import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import CustomerAccount from './CustomerAccount'
import CreateCustomer from './CreateCustomer'
import NavEmployee from './NavEmployee'

function MainEmployee() {
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Employee"){
  return (
    <div>
      <NavEmployee/>
      <h3 className='text-primary' align='center' style={{paddingTop:15}}>EMPLOYEE DASHBOARD</h3>
      <div className='container' style={{paddingTop:100 }}>
        <div className='row'>
          <div className='col' align='center' >
            <Link to='/CreateCustomer'>
              <img style={{width:250,height:250}}
            src="./images/user.png"
            alt="example"
          /></Link>
          <p className='display-6'>Create Customer</p>
          </div>
          <div className='col' align='center'><Link to='/CustomerAccount'> <img style={{width:250,height:250}}
            src="./images/view.png"
            alt="example"
          /></Link>
          <p className='display-6'>View Customer</p></div>
        </div>

      </div>
    </div>
  )
  }
  else
  {
    window.location="/"
  }
}

export default MainEmployee
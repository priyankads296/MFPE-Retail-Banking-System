
import { Link, Route, Routes } from 'react-router-dom'
import Statement from './Statement'
import DepositeMoney from './DepositeMoney'
import Transfer from './Transfer'
import Withdraw from './Withdraw'
import Login from '../Login'
import NavCustomer from './NavCustomer'
import { useEffect, useState } from 'react'

import {MdAccountBalanceWallet} from 'react-icons/md'
import React, { Component } from 'react'
import Navtest from './Navtest'
import CarouselCustomer from './CarouselCustomer'
import CarouselTest from '../../CarouselTest'

export class MainCustomer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       account:'',
       person:''
    }
  }

  async componentDidMount(){
    const details= await fetch(`http://localhost:54831/api/Account/getCustomerAccounts/${sessionStorage.getItem('userId')}`)
    const res2=await details.json()
    // console.log(res2)
    this.setState({account:res2})
    const details2=await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${sessionStorage.getItem('userId')}`)
    const res3=await details2.json()
    this.setState({person:res3})
    console.log(this.state)
  }

  render() {
    if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
      // const details=JSON.parse(sessionStorage.getItem('userID')
      console.log(this.state)

    return (
      <div>
        <NavCustomer/>
        {/* <div>
          <label>Current Account Id {this.state.account[0]}</label><label>&nbsp;&nbsp;&nbsp;Balance {this.state.account[1]}</label>
        </div>
        <div>
          <label>Current Account Id {this.state.account[2]}</label><label>&nbsp;&nbsp;&nbsp;Balance {this.state.account[3]}</label>
        </div>
        {/* <div>
          <h2>Welome {this.state.items.name}</h2>
        </div> */}
        <div className="container mt-5 mb-3">
    <div className="row">
      <div className='col-9'>
      <div className='row'>

        <div className="col-md-5">
            <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="ms-2 c-details">
              
                            <h6 className="mb-0 h3">Welcome {this.state.person.name}</h6>
                            
                            <p>{this.state.person.address}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <h4 className="heading text-warning">Total Account Balance </h4><h4 className='heading text-primary'>&nbsp;₹{this.state.account[1]+this.state.account[3]}</h4>
                </div>
            </div>
        </div>



        <div className="col-md-5">
            <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="icon"> <i className="bx bxl-reddit"></i> </div>
                        <div className="ms-2 c-details">
                            <h6 className="mb-0 h4">Accounts </h6>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <h5 className="heading h6 ">Current Account ID: {this.state.account[0]} </h5><p className='text-primary h5'> ₹{this.state.account[1]}</p>
                    <h5 className="heading h6 ">Savings Account ID: {this.state.account[2]} </h5><p className='text-primary h5'> ₹{this.state.account[3]}</p>
                </div>
            </div>
        </div>

        <div className='col h-25'>

<div className="jumbotron p-8 sm-4" style={{}}>
  <h1 className="display-4">Our Services</h1>
  <div className='col'>
  <CarouselCustomer/>
  </div>
</div></div>


    </div>
    </div>
    
    <div className='col'>
        <div className="col-md-10">
            <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="icon"> <i className="bx bxl-reddit"></i> </div>
                        <div className="ms-2 c-details">
                            <h6 className="mb-0 h4">Loans</h6>
                        </div>
                    </div>
                    
                </div>
                <div className="mt-3">
                  <p>Retail Banking System offers a wide range of loans to meet your diverse needs. Whether the need is for a house, child's education, our unique and need specific loans will enable you to convert your dreams to realities.</p>
                  <ul>
                    <li>House Loan</li>
                    <li>Personal Loan </li>
                    <li>Education Loan</li>
                    <li>Business Loan</li>
                  </ul>
                  
                  <strong>Please Contact our nearest Branch for more details</strong>
                  <br></br>
                </div>
            </div>
        </div></div>
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
  
  }


export default MainCustomer


// function MainCustomer() {
//   // const [details,setDetails]=useState()
//   // useEffect((async()) =>
//   // {
//   // const response=await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${sessionStorage.getItem('userId')}`);
//   // const data=await response.json()
//   //   console.log(response)
//   // }, [fetch]);
  
//   if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
//     // const details=JSON.parse(sessionStorage.getItem('userID'))

    // const details= await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${sessionStorage.getItem('userId')}`)
    //     const res2=await details.json()
    //     console.log(res2)
//   return (
//     <div>
//       <NavCustomer/>
//       <div>
//         <h2>Welcome {}</h2>
//       </div>
//       </div>

   
   
   
   
//   )
//   }
//   else
//   {
//     window.location="/"
//   }
// }

// export default MainCustomer
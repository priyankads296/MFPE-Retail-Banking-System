import { findAllByTestId } from "@testing-library/react";
import React, { Component } from "react";

import { Form, Button} from "react-bootstrap";
import CarouselTest from "../CarouselTest";
import Footer from "./Footer";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AccountId: "",
      pass: "",
      type:"Employee",
      errors:{},
      token:false
    };
  }
  handleValidations = () =>{
    let errors = {};
    let formIsValid = true;
    
    if (typeof this.state.AccountId !== "undefined") {
        if (!this.state.AccountId) {
            formIsValid = false;
            errors["AccountId"] = "Cannot be empty";
          }    
    }
    if (typeof this.state.pass !== "undefined") {
      if (!this.state.pass) {
          formIsValid = false;
          errors["pass"] = "Cannot be empty";
        }    
  }
    this.setState({errors:errors});
    return formIsValid;  
  }
  resetForm = () => {
    this.setState({
      AccountId: "",
      pass: "",
      type:"Employee",
      errors:{},
      token:''
      
    })
  }
  buttonClick = async (e) => {
    e.preventDefault();
    console.log(this.state)
    if(this.handleValidations())
    {
      const data = await fetch(`https://localhost:49155/api/Token/auth`,
      {
      method:"POST",
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        userId: (this.state.AccountId),
        password: this.state.pass,
        roles:this.state.type
      })
      })
      .then(res=>{
        res.json();
        sessionStorage.setItem('status',res.status)
      })
      .then(result=>result);
      console.log(JSON.stringify({
        userId: (this.state.AccountId),
        password: this.state.pass,
        roles:this.state.type
      }))
      if(sessionStorage.status==='400'){
        this.resetForm();
        this.setState({errors:{pass:"Enter valid password or userId"}})
        this.state.token=false
      }
      else{
        this.state.token=true
        
        sessionStorage.setItem("token",this.state.token)
        sessionStorage.setItem("roles",this.state.type)
        sessionStorage.setItem("userId",this.state.AccountId)
        
        if(sessionStorage.getItem('roles')==='Customer' && sessionStorage.getItem('token'))
        {
          const cust=await fetch(`http://localhost:54831/api/Account/getCustomerAccounts/${this.state.AccountId}`)
          const res=await (cust).json()
          console.log(cust)
          console.log(res)
  
          
  
          sessionStorage.setItem('cId',res[0])
          sessionStorage.setItem('sId',res[2])
          sessionStorage.setItem('sBal',res[3])
          sessionStorage.setItem('cBal',res[1])
          sessionStorage.setItem('userId',this.state.AccountId)
          
            window.location="./MainCustomer"
        }
        else if(sessionStorage.getItem('roles')==='Employee' && sessionStorage.getItem('token'))
        {
          window.location='./MainEmployee'
        }
      }
      
      console.log(this.state)
      }
    }
     
      

  render() {
    return (

      <div className="container">
      <div className="row">


        <div className="col-md-6">
        <img src="./images/3.jpg" alt=''></img>
        </div>


        <div className="col " align='right' >
      <Form className="m-left " style={{ width: "75%",padding:50 }}>
        <div className='col-md-6' align='left'>
        <Form.Group className="mb-3 col-12" controlId="formBasicAccountId">
          <Form.Label className="">Enter userID</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter AccountId"
            value={this.state.AccountId}
            name="AccountId"
            onChange={(e) => {
              this.setState({ AccountId: e.target.value });
            }}
          />
          <span style={{ color: "red" }}>{this.state.errors["AccountId"]}</span>

        </Form.Group>

        <Form.Group className="mb-3 col-12" controlId="formBasicPassword">
          <Form.Label  className="">Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={this.state.pass}
            name="pass"
            onChange={(e) => {
              this.setState({ pass: e.target.value });
            }}
          />
        </Form.Group>
{/*         
        <div className="row mb-2"> */}
        <Form.Group className="mb-3 col-12">
        <Form.Label className="">Login As</Form.Label>
        <select className="form-select form-select-mb  mb-3 col-12" value={this.state.type} onChange={(e)=>
          {this.setState({type:e.target.value});}}>
            <option value="Customer">Customer</option>
            <option value="Employee">Employee</option>
          </select>
          <p> </p>
          <p> </p>
          </Form.Group>
        <div className="row m-2">
          <Button
            className="col-5 border text-white btn btn-dark"
            variant="outline"
            type="submit"
            onClick={this.buttonClick}
          >
            Login
          </Button>
          <p> </p>
          <span style={{ color: "red" }}>{this.state.errors["pass"]}</span>
        </div>
        </div>
      </Form>
      </div>
      </div>
    
      
      <div className="row sm-5">
        <div className="col">
      <Footer/>
      </div>
      </div>
      </div>
      
    );
  }
}

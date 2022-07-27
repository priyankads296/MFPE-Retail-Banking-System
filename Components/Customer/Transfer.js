import NavCustomer from './NavCustomer'
import React, { Component } from 'react'

class Transfer extends Component {
  constructor(props) {
    super(props)
  
    this.state ={
      source_accid: '',
      destination_accid: '',
      amount: ''
    }
  }
  changeHandler=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  submitHandler=async e=>{
    console.log(this.state)
    e.preventDefault()
    // axios.post('https://localhost:44391/api/Customer/createCustomer',this.state).then(response=>{console.log(response)}).then(error=>console.log(error))
    await fetch('http://localhost:54831/api/Account/transfer',
        {
        // mode:'cors',
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(result=>result);
    console.log(this.state)

  }
  render() {
    if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
    return (
      <div><NavCustomer/>  
      <div className="container" align='center' style={{'padding':100}}>
        
      <form onSubmit={this.submitHandler}>
      <div className='w-25 p-3 bg-light border border-info' align='center'>
      <h2>Transfer</h2>
      <div className="form-group mt-3">
      <label>Enter Your AccountId</label><br></br>
      <input className="form form-control mt-3" type='text' value={this.source_accid} name='source_accid' onChange={this.changeHandler}></input>
      </div>
      <div className="form-group mt-3">
      <label>Enter Receiver AccountId</label><br></br>
      <input className="form form-control mt-3" type='text' value={this.destination_accid} name='destination_accid' onChange={this.changeHandler}></input>
      </div>
      <div className="form-group mt-3">
      <label>Enter amount to be Transfered</label><br></br>
      <input className="form form-control mt-3" type='text' value={this.amount} name='amount' onChange={this.changeHandler}></input><br></br>
      </div>
      <button className="btn btn-sm btn-outline-primary" type='Submit'>Transfer</button>
      </div>
      </form>
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

export default Transfer
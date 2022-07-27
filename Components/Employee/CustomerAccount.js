import { Link, useNavigate } from 'react-router-dom'
import NavEmployee from './NavEmployee'
import React, { Component, useState } from 'react'
import CustomerAccountStatus from './CustomerAccountStatus'
import EmployeeFooter from './EmployeeFooter';


function CustomerAccount() {
  const [ customer_id,setId]=useState();
  const [items,setItems]=useState([])
  const [loaded,setLoad]=useState(false)
  const submitHandler=async e=>{
    e.preventDefault();
    const response=await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${customer_id}`)
    const data=await response.json()
    setItems(data)
    console.log(response)
    statusPage()
    if((items.length)!==0 && response.status===200)
    setLoad(true)
    if(response.status===400)
    {
      window.location="./CustomerAccount"
    }
    // navigate('/CustomerAccountStatus',{prop:items})
  }
  const statusPage=()=>{
    
  }
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Employee"){
  return (
    <div className='row' align='center'>  <NavEmployee/>  
    <div className='col-5'>
        <img  className="d-block w-100" src='./images/customer-details.jpg' alt=''></img>
      </div>
              
   <div className='col-6'>
  {loaded===true?
  // <CustomerAccountStatus name={items}/>
  // <div className='container' style={{'padding':100}}>
  //   <p>Name     &nbsp;      {items.name}</p>
  //   <p>Address   &nbsp;     {items.address}</p>
  //   <p>DOB &nbsp;  {items.dob}</p>
  //   <p>PAN Number &nbsp;    {items.paN_Number}</p>
  // </div>
  <div className="container" align='center' style={{width:"50%",paddingTop:100}}>
  <h2 className='text-primary'>Customer Details</h2>           
  <table className="table" align='center'>

    <tbody>
      <tr>
        <td>Name</td>
        <td className='text-success'><strong>{items.name}</strong></td>
      </tr>
      <tr>
        <td>Address</td>
        <td>{items.address}</td>
      </tr>
      <tr>
        <td>Date of Birth</td>
        <td>{items.dob}</td>
      </tr>
  
    </tbody>
  </table>
  </div>
  :
      <div className="container" align='center' style={{'padding':100}}>
          
      <form onSubmit={submitHandler}>
      <div className='w-50 p-3 bg-light border rounded' align='center'>
      <h2>Customer Details</h2>
      <div className="form-group mt-3" align='left'>
      
      <label>Enter CustomerID</label><br></br>
      <input className="form form-control mt-3" type='text' name=' customer_id' onChange={(e)=>setId(e.target.value)}></input>
      </div>
      <p> </p>
      <button className="btn btn-sm btn-dark" type='submit'>Submit</button>
      </div>
      </form>
      <EmployeeFooter/>
  </div>
  }
  </div>   
  </div>
  )
}
else
{
  window.location="/"
}
}

export default CustomerAccount

// class CustomerAccount extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       id: "",
//       isLoaded:false,
//       items:[]
//     }
//   }
//   navigate=useNavigate();
//   changeHandler=e=>{
//     this.setState({[e.target.name]:e.target.value})
//   }
  // submitHandler=async e=>{
  //   e.preventDefault();
  //   // await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${this.state.id}`)
  //   // .then(response => {response.json();
  //   // console.log(JSON.stringify(response.body))})
  //   // .then(data=>this.setState({[e.items]:data}))
  //   // .catch(err=>console.log(err));
  //   // console.log(this.state.items)
  //   const response=await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${this.state.id}`)
  //   const data=await response.json()
  //   this.state.items=data
  //   console.log(this.state.items)
  //   this.state.isLoaded=true;
  //   this.navigate("/CustomerAccountStatus",{props:this.state.items})
  // }
//   render() {
//     return (
  //     <div className='container-fluid' align='center'>    
              
  //     <NavEmployee/>
  
  //     <div className="container" align='center' style={{'padding':50}}>
          
  //     <form onSubmit={this.submitHandler}>
  //     <div className='w-25 p-3 bg-light border border-info' align='center'>
  //     <div className="form-group mt-3">
  //     <h2>Customer Details</h2>
  //     <label>Enter AccountID</label><br></br>
  //     <input className="form form-control mt-3" type='text' name='id' value={this.state.id} onChange={this.changeHandler}></input>
  //     </div>
  //     <p> </p>
  //     <button className="btn btn-sm btn-outline-primary" type='submit'>Submit</button>
  //     </div>
  //     </form>
  // </div>
  // </div>
//     )
    
//   }
// }
// export default CustomerAccount
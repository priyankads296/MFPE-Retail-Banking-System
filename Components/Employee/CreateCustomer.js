import NavEmployee from './NavEmployee'
import React, { useState } from 'react'
import CreateCustomerStatus from './CreateCustomerStatus'
import EmployeeFooter from './EmployeeFooter'

function CreateCustomer() {
const [items,setItems]=useState({
        name:'',
        dob:'',
        address:'',
        paN_Number:''
})
const [loaded,setLoad]=useState(false)
const [res,setRes]=useState([])
const submitHandler=async e=>{
  e.preventDefault()
  console.log(items)
  // axios.post('https://localhost:44391/api/Customer/createCustomer',this.state).then(response=>{console.log(response)}).then(error=>console.log(error))
  const response=await fetch(`https://localhost:44391/api/Customer/createCustomer`,
      {
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:items.name,
        dob:items.dob,
        address:items.address,
        panNo:items.paN_Number
      })
      })
  const data=await response.json()
  console.log(data)
  if(response.status===200)
  {
    setLoad(true)
    setRes(data)
    console.log(data)
  }
}


if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Employee"){
  return (
  
  <div className='row'>       
  <NavEmployee/>
  {/* gif.gif.crdownload */}
  <div className='col-5'>
        <img  className="d-block w-100" src='./images/document.jpg' alt=''></img>
      </div>
    
      <div className='col-6 '>
  {loaded===true?
<div className="container" align='center' style={{width:"50%",paddingTop:100}}>
  <h2 className='text-primary'>Customer Creation Status</h2>           
  <table className="table" align='center'>

    <tbody>
      <tr>
        <td>Creation Status</td>
        <td className='text-success'><strong>{res.message}</strong></td>
      </tr>
      <tr>
        <td>Customer Id</td>
        <td>{res.customerId}</td>
      </tr>
      <tr>
        <td>Current Account Id</td>
        <td>{res.currentAccountId}</td>
      </tr>
      <tr>
        <td>Savings Account Id </td>
        <td >{res.savingsAccountId}</td>
      </tr>
    </tbody>
  </table>
  </div>
:
  <div className="container" align='center' style={{'paddingTop':50}}>
      
  <form onSubmit={submitHandler} >
  <div className='p-2 bg-light border rounded' align='center' style={{width:"45%"}}>
  <h2>Create Customer</h2>
  <div className="form-group mt-3" align='left'>
 
  <label>Enter Customer Name</label><br></br>
  <input className="form form-control mt-3" type='text' name='name' value={items.name} onChange={e=>setItems({...items,name:e.target.value})}></input>
  </div>
  <div className="form-group mt-3" align='left'>
  <label>Enter Customer Address</label><br></br>
  <input className="form form-control mt-3" type='text' value={items.address} name='address' onChange={e=>setItems({...items,address:e.target.value})}></input>
  </div>
  <div className="form-group mt-3" align='left'>
  <label>Enter Customer Date of Birth</label><br></br>
  <input className="form form-control mt-3" type='date' value={items.dob} name='dob' onChange={e=>setItems({...items,dob:e.target.value})}></input>
  </div>
  <div className="form-group mt-3" align='left'>
  <label>Enter PAN Number</label><br></br>
  <input className="form form-control mt-3" type='text' value={items.paN_Number} name='panNo' onChange={e=>setItems({...items,paN_Number:e.target.value})}></input>
  </div>
  <button className="btn btn-md btn-dark mt-2" type='submit' >Submit</button>
  </div>
  </form>
  
</div>
}
<EmployeeFooter/>
</div>
</div>
  )
}
else
{
  window.location="/"
}
}
export default CreateCustomer


// class CreateCustomer extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state ={
//        name:'',
//        dob:'',
//        panNo:'',
//        address:'',
//        isLoaded:false,
//        items:[],
//     }
//   }
//   changeHandler=e=>{
//     this.setState({[e.target.name]:e.target.value})
//   }
//   submitHandler=async e=>{
//     e.preventDefault()
//     // axios.post('https://localhost:44391/api/Customer/createCustomer',this.state).then(response=>{console.log(response)}).then(error=>console.log(error))
//     const response=await fetch(`http://localhost:5210/api/createcustomer`,
//         {
//         method:"POST",
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//           name:this.state.name,
//           dob:this.state.dob,
//           address:this.state.address,
//           paN_Number:this.state.panNo
//         })
//         })
//     const data=await response.json()
//     console.log(data)
//     if(response.status===200)
//     {
//       this.state.isLoaded=true
//       this.state.items=data;
//     }

//     console.log(this.state.items)
//   }
//   render() {
//     return (
//       <div className='container-fluid' align='center'>    
            
//     <NavEmployee/>

//     <div className="container" align='center' style={{'padding':50}}>
        
//     <form onSubmit={this.submitHandler}>
//     <div className='w-50 p-3 bg-light border border-info' align='center'>
//     <div className="form-group mt-3">
//     <h2>Create Customer</h2>
//     <label>Enter Customer Name</label><br></br>
//     <input className="form form-control mt-3" type='text' name='name' value={this.state.name} onChange={this.changeHandler}></input>
//     </div>
//     <div className="form-group mt-3">
//     <label>Enter Customer Address</label><br></br>
//     <input className="form form-control mt-3" type='text' value={this.state.address} name='address' onChange={this.changeHandler}></input><br></br>
//     </div>
//     <div className="form-group mt-3">
//     <label>Enter Customer Date of Birth</label><br></br>
//     <input className="form form-control mt-3" type='date' value={this.state.dob} name='dob' onChange={this.changeHandler}></input><br></br>
//     </div>
//     <div className="form-group mt-3">
//     <label>Enter PAN Number</label><br></br>
//     <input className="form form-control mt-3" type='text' value={this.state.panNo} name='panNo' onChange={this.changeHandler}></input><br></br>
//     </div>
//     <button className="btn btn-outline-primary" type='submit' >Submit</button>
//     </div>
//     </form>
// </div>
// <p>{this.state.items}</p>
// {/* <CreateCustomerStatus name={items}/> */}
// </div>
//     )
//   }
// }


// export default CreateCustomer
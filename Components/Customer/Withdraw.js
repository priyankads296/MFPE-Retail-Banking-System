import NavCustomer from './NavCustomer'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'


function Withdraw() {
  const [items,setItems]=useState({
    AccountId:'',
    Balance:''
  })
  const [isLoaded,setLoad]=useState(false)
  const [res,setRes]=useState([])

  const [acc,setAcc]=useState([])
  useEffect(()=>{
    setAcc(prevArray => [prevArray, sessionStorage.getItem('cId')])
    setAcc(prevArray => [...prevArray, sessionStorage.getItem('sId')])
    // setValue(null)
  },[])
  const submitHandler=async e=>{
    e.preventDefault()
    const response=await fetch(`http://localhost:54831/api/Account/withdraw?AccountId=${items.AccountId}&amount=${items.Balance}`,
    {
      method: "POST",
      header:{'Content-Type':'application/json', 'Accept': 'application/json'}
      
    }
    )
    
    const data=await response.json()
    
    if(response.status===200){
      setLoad(true)
      setRes(data)
    }

    console.log(response)
    // console.log(items)
    console.log(isLoaded)
    console.log(res)
  }

  
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
    return (
      <div className='row'><NavCustomer/>  
        <div className='col-5'>
        <img  className="d-block w-100" src='./images/withdraw.jpg' alt=''></img>
      </div>
      <div className='col-6'>
      <div className="container" align='center' style={{'padding':150}}>
      {isLoaded===true?
     <div className="container ">
     <h2 className='text-primary'>WITHDRAW STATUS</h2>           
     <table className="table">
   
       <tbody>
         <tr>
           <td>Account Id</td>
           <td>{items.AccountId}</td>
         </tr>
         <tr>
           <td>Previous Account Balance</td>
           <td>{res.sbal}</td>
         </tr>
         <tr>
           <td>Updated Account Balance</td>
           <td>{res.rbal}</td>
         </tr>
         <tr>
           <td>Status </td>
           <td className='text-success'><strong>{res.transferStatus}</strong></td>
         </tr>
       </tbody>
     </table>
     </div>
      :
      <div className='container rounded' style={{backgroundColor:'#6495ED'}}>
      <form onSubmit={submitHandler}>
      <div className='container' align='center' >
      <h2 style={{paddingTop:30}}>WITHDRAW</h2>
      <div className="form-group mt-3" align='left'>
    
      <label>Select Account</label><br></br>
      <input type="radio" value="{acc[1]}" name="acc" onChange={e=>setItems({AccountId:acc[1]})}/><label>&nbsp;&nbsp;{acc[1]}</label><br></br>
      <input type="radio" value="{acc[2]}" name="acc" onChange={e=>setItems({AccountId:acc[2]})}/><label>&nbsp;&nbsp;{acc[2]}</label>
      {/* <input className="form form-control mt-3" type='text' value={items.AccountId} namae='accountId' onChange={e=>setItems({...items,AccountId:e.target.value})}></input> */}
      </div>
      <div className="form-group mt-1" align='left'>
      <label>Enter amount to be withdrawed</label><br></br>
      <input className="form form-control mt-3" type='text' value={items.Balance} namae='balance' onChange={e=>setItems({...items,Balance:e.target.value})}></input><br></br>
      </div>
      <button className="btn btn-md btn-dark" type='Submit'>Withdraw</button><p>&nbsp;</p>
      </div>
      </form>
      </div>
  }
  </div>
  </div>

  </div>
    )
    }
    else{
      window.location="/"
    }
  }


export default Withdraw

// class Withdraw extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       accountId: '',
//       balance: ''
//     }
//   }
//   changeHandler=e=>{
//     this.setState({[e.target.name]:e.target.value})
//   }
//   submitHandler=async e=>{
//     e.preventDefault()
//     axios.post('https://localhost:44391/api/Customer/createCustomer',(this.setState)).then(response=>{console.log(response.body)}).then(error=>console.log(error))
//     // await fetch('https://localhost:44379/api/Account/withdraw',
//     //     {
//     //     // mode:'cors',
//     //     method:"POST",
//     //     headers:{
//     //         'Content-Type':'application/json'
//     //     },
//     //     body:JSON.stringify(this.state)
//     //     })
//     //     .then(res=>res.json())
//     //     .then(result=>result);
//     console.log(this.state)

//   } 
//   render() {
//     if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
//     return (
//       <div><NavCustomer/>  
//       <div className="container" align='center' style={{'padding':100}}>
        
//       <form onSubmit={this.submitHandler}>
//       <div className='w-25 p-3 bg-light border border-info' align='center'>
//       <div className="form-group mt-3">
//       <h2>Withdraw</h2>
//       <label>Enter Your AccountId</label><br></br>
//       <input className="form form-control mt-3" type='text' value={this.accountId} namae='accountId' onChange={this.changeHandler}></input>
//       </div>
//       <div className="form-group mt-3">
//       <label>Enter amount to be withdrawed</label><br></br>
//       <input className="form form-control mt-3" type='text' value={this.balance} namae='balance' onChange={this.changeHandler}></input><br></br>
//       </div>
//       <button className="btn btn-sm btn-outline-primary" type='Submit'>Withdraw</button>
//       </div>
//       </form>
//   </div>
//   </div>
//     )
//     }
//     else{
//       window.location="/"
//     }
//   }
// }

// export default Withdraw
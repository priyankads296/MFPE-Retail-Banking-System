
import NavCustomer from './NavCustomer'
import React, { Component, useEffect, useState } from 'react'
import { BiGame } from 'react-icons/bi'



function DepositeMoney() {


  const [items,setItems]=useState({
    AccountId:'',
    Balance:''
  })
  // const [value,setValue]=useState()
  const [acc,setAcc]=useState([])
  useEffect(()=>{
    setAcc(prevArray => [prevArray, sessionStorage.getItem('cId')])
    setAcc(prevArray => [...prevArray, sessionStorage.getItem('sId')])
    // setValue(null)
  },[])


  const [isLoaded,setLoad]=useState(false)
  const [res,setRes]=useState([])
  
  const submitHandler=async e=>{
    e.preventDefault()
    console.log(items.AccountId)
    const response=await fetch(`http://localhost:54831/api/Account/deposit?AccountId=${items.AccountId}&amount=${items.Balance}`,
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

    console.log(response.status)
    // console.log(items)
    console.log(isLoaded)
    console.log(res)
  }
 
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
    // console.log(isLoaded)
    console.log(acc[1])
    return (
      <div className='row'><NavCustomer/>
      <div className='col-5'>
        <img  className="d-block w-100" src='./images/deposit1.jpg' alt=''></img>
      </div>
      <div className='col-6 '>
      <div className='container' align='center' style={{'padding':150}}>
      {isLoaded===true?
  //     <div className='container'>
  //       <div className='row'>
  //       <p className='h4' align='left'>Your Previous Account balance is ₹{res.sbal}</p><br></br>
  //       </div>
  //       <div className='row'>
  //       <p className=''>Your Updated Account balance is ₹{res.rbal}</p><br></br>
  //       </div>
  //       <div className='row'>
  // <strong className='text-success'>{res.transferStatus}</strong>
  //       </div>
  //     </div>
  <div className="container">
  <h2 className='text-primary'>DEPOSIT STATUS</h2>           
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
  {/* <button className="btn btn-md btn-dark"  type='Go Back' onClick={window.loaction="./DepositeMoney"} >DGo</button><p>&nbsp;</p> */}
  </div>
    :
    <div className='container rounded' style={{backgroundColor:'#6495ED'}}>
     
      <form className='' onSubmit={submitHandler}>
        
      <div className='container ' align='center' >
          
     
      <h2 className='text-dark' style={{paddingTop:30}}>DEPOSIT</h2>
      <div className="form-group mt-3" align='left'>
      <label align=''>Select Your Account</label><br></br>
      <input type="radio" value="{acc[1]}" name="acc" onChange={e=>setItems({AccountId:acc[1]})}/><label>&nbsp;&nbsp;{acc[1]}</label><br></br>
      <input type="radio" value="{acc[2]}" name="acc" onChange={e=>setItems({AccountId:acc[2]})}/><label>&nbsp;&nbsp;{acc[2]}</label>
      {/* <input className="form form-control mt-3 id" type='text' value={items.AccountId} name='AccountId' onChange={e=>setItems({...items,AccountId:e.target.value})}></input> */}
      </div>
      <div className='form-group mt-1' align='left'>
      <label>Enter amount to be deposited</label><br></br>
      <input className="form form-control mt-3" type='text' value={items.Balance}  name='Balance' onChange={e=>setItems({...items,Balance:e.target.value})}></input><br></br>
      </div>
      <button className="btn btn-md btn-dark"  type='submit' >Deposit</button><p>&nbsp;</p>
      </div>
      </form>
     
    </div>
  }
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
export default DepositeMoney

// class DepositeMoney extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        AccountId:'',
//        Balance:'',
//        status:[],
//        isLoaded:false
//     }
//   }
//   changeHandler=e=>{
//     this.setState({[e.target.name]:e.target.value})
//   }
//   submitHandler=async e=>{
//     e.preventDefault()
//     const response=await fetch(`http://localhost:54831/api/Account/deposit?AccountId=${this.state.AccountId}&amount=${this.state.Balance}`,
//     {
//       method: "POST",
//       header:{'Content-Type':'application/json', 'Accept': 'application/json'}
      
//     }
//     )
//     // console.log(response.status)
//     if(response.status===200)
//     this.state.isLoaded=true
//     const data=await response.json()
//     this.state.status=data
//     console.log(this.state.status)
//     console.log(this.state.isLoaded)
//         // {
//         // // mode: 'no-cors',
//         // method:"POST",
//         //  headers:{
//         //     'Content-Type':'application/json',
//         //     'Accept': 'application/json'
//         // },
//         // body: JSON.stringify({
//         //   accountId:this.state.AccountId,
//         //   balance:this.state.Balance
//         // }
//         // )
//         // }
        
    
//     // console.log(JSON.stringify({
//     //   accountId:this.state.AccountId,
//     //   balance:this.state.Balance
//     // }))
//   }
//   render() {
//     if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
//     return (
//       <div><NavCustomer/>
//       {this.state.isLoaded===true?<p>Working</p>:<p>not Working{this.state.isLoaded}</p>}
//       <div className='container' align='center' style={{'padding':100}}>
//       {/* {this.state.isLoaded===true?
//       <div>
//         <p className='font-weight-bold text-success text-uppercase'>Your Previous Account balance is {this.state.status.sbal}</p><br></br>
//         <p className='font-weight-bold text-success text-uppercase'>Your Updated Account balance is {this.state.status.rbal}</p><br></br>
//   <label className='text-success'>{this.state.status.transferStatus}</label>
//       </div>
//     : */}
//       <form onSubmit={this.submitHandler}>
//       <div className='w-25 p-3 bg-light border border-info' align='center'>
          
     
//       <h2>Deposite</h2>
//       <div className="form-group mt-3">
//       <label>Enter Your AccountId</label><br></br>
//       <input className="form form-control mt-3 id" type='text' value={this.state.AccountId} name='AccountId' onChange={this.changeHandler}></input>
//       </div>
//       <div className='form-group mt-1'>
//       <label>Enter amount to be deposited</label><br></br>
//       <input className="form form-control mt-3" type='text' value={this.state.Balance}  name='Balance' onChange={this.changeHandler}></input><br></br>
//       </div>
//       <button className="btn btn-sm btn-outline-primary" type='submit' >Deposite</button>
//       </div>
//       </form>
//     {/* } */}
//       </div>
//       </div>
  
//     )
//     }
//     else
//     {
//       window.location="/"
//     }
//   }
// }



// export default DepositeMoney
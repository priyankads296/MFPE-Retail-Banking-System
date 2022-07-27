import NavCustomer from './NavCustomer'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'


function Statement() {

  const [items,setItems]=useState(
    {
      AccountId:'',
      start_date:'',
      end_date:'',
    }
  )
    const [res,setRes]=useState({})
    const [isLoaded,setLoad]=useState(false)
    const [acc,setAcc]=useState([])
    useEffect(()=>{
      setAcc(prevArray => [prevArray, sessionStorage.getItem('cId')])
      setAcc(prevArray => [...prevArray, sessionStorage.getItem('sId')])
      // setValue(null)
    },[])

  const submitHandler=async e=>{
    e.preventDefault();
   // console.log((items.start_date).toString)
    const data=await fetch(`http://localhost:54831/api/Account/getAccountStatement/${items.AccountId}/${items.start_date}/${items.end_date}`)
  
    const response=await data.json()
    console.log(response)
    if(data.status===200){
    setRes(response[0])
    setLoad(true)
    console.log(res)
    console.log(isLoaded)
    }
    
  }

  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
    return (
      <div className='row'><NavCustomer/> 
      <div className='col-5'>
        <img  className="d-block w-100" src='./images/state1.png' align='center' alt='' style={{paddingTop:50,paddingLeft:100}}></img>
      </div>
      <div className='col-6'>
      <div className="container" align='center' style={{'padding':100}}>
       {isLoaded===true?
        //    <div className='container' style={{'padding':100}}>
        //    <p>AccountID     &nbsp;      {res.accountId}</p>
        //    <p>Date  &nbsp;     {res.date}</p>
        //    <p>Narration &nbsp;  {res.narration}</p>
        //     <p>Reference No &nbsp;    {res.refno}</p> 
        //    <p>Value Date &nbsp;    {res.valueDate}</p>
        //    <p>Withdraw &nbsp;    {res.withdrawal}</p>
        //    <p>Deposit &nbsp;    {res.deposit}</p>
        //    <p>Closing Balance &nbsp; {res.closingBalance}</p>
        //  </div>
         <div className="container " style={{width:"65%"}}>
         <h2 className='text-primary'>ACCOUNT STATEMENT</h2>           
         <table className="table">
       
           <tbody>
             <tr>
               <td>Account Id</td>
               <td>{items.AccountId}</td>
             </tr>
             <tr>
               <td>Date</td>
               <td>{res.date}</td>
             </tr>
             <tr>
               <td>Narration</td>
               <td>{res.narration}</td>
             </tr>
             <tr>
               <td>Reference No </td>
               <td >{res.refno}</td>
             </tr>
             <tr>
               <td>Value Date</td>
               <td >{res.valueDate}</td>
             </tr>
             <tr>
               <td>Withdraw </td>
               <td >{res.withdrawal}</td>
             </tr>
             <tr>
               <td>Deposit </td>
               <td >{res.deposit}</td>
             </tr>
             <tr>
               <td>Closing Balance</td>
               <td >{res.closingBalance}</td>
             </tr>
           </tbody>
         </table>
         </div>
         : 
      <div className='container rounded' style={{width:"75%",backgroundColor:'#6495ED'}}>
      <form onSubmit={submitHandler}>
      <div className='container' align='center'>
      <h2 style={{paddingTop:30}}>STATEMENT</h2>
      <div className="form-group mt-1 " align='left'>
      <label>Select Account</label><br></br>
      <input type="radio" value="{acc[1]}" name="acc" onChange={e=>setItems({AccountId:acc[1]})}/><label>&nbsp;&nbsp;{acc[1]}</label><br></br>
      <input type="radio" value="{acc[2]}" name="acc" onChange={e=>setItems({AccountId:acc[2]})}/><label>&nbsp;&nbsp;{acc[2]}</label>
      {/* <input className="form form-control mt-3 id" type='text' value={items.AccountId}  onChange={e=>setItems({...items,AccountId:(e.target.value)})}></input> */}
      </div>
      <div className="form-group mt-2" align='left'>
      <label>Enter Start Date</label><br></br>
      {/* <ReactDatePicker selected={items.start_date} onChange={e=>setItems({...items,start_date:e.target.value})}>

      </ReactDatePicker> */}
      <input className="form form-control" type='date' value={items.start_date} onChange={e=>setItems({...items,start_date:(e.target.value)})}></input><br></br>
      </div>
      <div className="form-group mt-1" align='left'>
      <label>Enter End Date</label><br></br>
      {/* <ReactDatePicker selected={items.end_date}   onChange={e=>setItems({...items,end_date:e.target.value})}></ReactDatePicker> */}
      <input className="form form-control" type='date' value={items.end_date}  onChange={e=>setItems({...items,end_date:e.target.value})}></input><br></br>
      </div>
      <button className="btn btn-md btn-dark" type='Submit'>Submit</button><p>&nbsp;</p>
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

export default Statement

// export class Statement extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        id:0,
//        start_date:'',
//        end_date:''
//     }
//   }
//   changeHandler=e=>{
//     this.setState({[e.target.name]:e.target.value})
//   }
//   submitHandler=async e=>{
//     e.preventDefault();
//     await fetch(`http://localhost:54831/api/Account/getAccountStatement/${this.state.AccountId}/${this.state.start_date}/${this.state.end_date}`)
//     .then(res=>res.json()).then(data=>console.log(data))
//     console.log(this.state)
//   }
//   render() {
//     if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Customer"){
//     return (
//       <div><NavCustomer/> 
//       <div className="container container-fluid" align='center' style={{'padding':100}}>
       
//       <form onSubmit={this.submitHandler}>
//       <div className='w-25 p-3 bg-light border border-info' align='center'>
//       <h2>Account Statement</h2>
//       <div className="form-group mt-3">
//       <label>Enter Your AccountId</label><br></br>
//       <input className="form form-control mt-3 id" type='text' value={this.id} name='id' onChange={this.changeHandler}></input>
//       </div>
//       <div className="form-group mt-3">
//       <label>Enter Start Date</label><br></br>
//       <input className="form form-control mt-3 id" type='date' value={this.start_date} name='start_date' onChange={this.changeHandler}></input><br></br>
//       </div>
//       <div className="form-group mt-3">
//       <label>Enter End Date</label><br></br>
//       <input className="form form-control mt-3 id" type='date' value={this.end_date} name='end_date' onChange={this.changeHandler}></input><br></br>
//       </div>
//       <button className="btn btn-sm btn-outline-primary" type='Submit'>Submit</button>
//       </div>
//       </form>
//   </div>
//   </div>
//     )
//     }
//     else
//     {
//       window.location="/"
//     }
//   }
// }
// export default Statement
import React, { Component } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import EmployeeFooter from './EmployeeFooter'

export class NavEmployee extends Component {

  // constructor(props) {
  //   super(props)
  
  //   this.state = {
  //      emp:''
  //   }
  // }

  
  // async componentDidMount(){
  //   const details= await fetch(`https://localhost:44391/api/Customer/getCustomerDetails/${sessionStorage.getItem('userId')}`)
  //   const res2=await details.json()
  //   this.setState({emp:res2})
  //   console.log(this.state)
  // }

  render() {
    return (
      <div >    
            
    <nav className='navbar navbar-expand-lg navbar-light bg-dark fixed'>
      <ul className='navbar-nav' style={{'paddingLeft':20}}>
        <li className='nav-item'>
          <span className='navbar-brand text-primary'>Employee ID : {sessionStorage.getItem('userId')}</span>
    </li>
    <li className='nav-item'>
    <Link to='/MainEmployee' className='navbar-brand text-light'>Home</Link>
    </li>
    {/* <Link to='/Transfer' className='navbar-brand text-light'>Transfer&nbsp;</Link> */}
    <li className='nav-item'>
    <Link to='/CreateCustomer' className='navbar-brand text-light'>Create Customer</Link>
    </li>
    <li className='nav-item'>
    <Link to='/CustomerAccount' className='navbar-brand text-light'>View Customer</Link>
    </li>
    </ul>
    <ul className='navbar-nav ms-auto' style={{'paddingRight':20}}>
    <li className='nav-inline nav-item' align='right'>
    <div className="nav navbar-nav navbar-right">
    {/* <Link to='/' className='navbar-brand bg-light account-logout navbar-right'></Link> */}
    <a href="/" align='right'><BiLogOut size="2em" color='white'/></a>
      </div>
      </li>
      </ul>
      <EmployeeFooter/>
    </nav>
    </div>
    )
  }
}

export default NavEmployee
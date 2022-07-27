import React from 'react'
import {Link} from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi'
import Footer from '../Footer'
import CustomerFooter from './CustomerFooter'


function NavCustomer() {
  return (
    <div>    
            
    <nav className='navbar navbar-expand-lg navbar-light bg-dark fixed' align='center'>
      <ul className='navbar-nav' style={{'paddingLeft':20}}>
        <li className='nav-item'>
    <Link to='/MainCustomer' className='navbar-brand text-light'>Home &nbsp;</Link><label></label>
    </li>
    <li className='nav-item'>
    <Link to='/DepositeMoney' className='navbar-brand text-light'>Deposite Money&nbsp;</Link>
    </li>
    {/* <Link to='/Transfer' className='navbar-brand text-light'>Transfer&nbsp;</Link> */}
    <li className='nav-item'>
    <Link to='/Withdraw' className='navbar-brand text-light'>Withdraw Money</Link>
    </li>
    <li className='nav-item'>
    <Link to='/Statement' className='navbar-brand text-light'>See Account Statement&nbsp;</Link>
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
      
    </nav>
    <CustomerFooter/>
</div>
  )
}

export default NavCustomer
import React from 'react'
function CustomerAccountStatus(props) {
  console.log(props.name)
  const items=props.name
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Employee"){
  return (
    <div className='container' align='center'>
      <div className='w-75 p-3 ' align='center'>
      <div className='row justify-content-md-center'>
        <div className='col' align='left'>
          <label>Name &nbsp; &nbsp;</label>
          <lable>{items.name}</lable>
        </div>
      </div>
      <div className='row justify-content-md-center'>
        <div className='col' align='left'>
          <label>Address &nbsp; &nbsp;</label>
          <lable>{items.address}</lable>
        </div>
      </div>
      <div className='row justify-content-md-center'>
        <div className='col' align='left'>
          <label>Date of Birth &nbsp; &nbsp;</label>
          <lable>{items.dob}</lable>
        </div>
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

export default CustomerAccountStatus
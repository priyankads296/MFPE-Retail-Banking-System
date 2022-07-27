import React from 'react'

function CreateCustomerStatus(props) {
  // console.log(props.name)
  if(sessionStorage.getItem('status')==='200' && sessionStorage.getItem('roles')==="Employee"){
  return (
    <div>
      <div>
        {props.customerId}
      </div>
    </div>
  )
  }
  else{
    window.location="/"
  }
}

export default CreateCustomerStatus
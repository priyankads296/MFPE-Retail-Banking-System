import React from 'react'
import CarouselTest from '../CarouselTest'
// import Carousel from 'react-bootstrap/Carousel';
import {BsGithub} from "react-icons/bs"
import {BsFacebook,BsGoogle} from 'react-icons/bs'


import './Style.css'
function Footer() {
  return (
    
    <div className='container'>
        
        <footer className="container-fluid text-center fixed-bottom  bg-dark">
        <div className='row'>


            <div className='col-3 ' align='left' style={{padding:10}}>
              <h4 className='text-light'>Connect</h4>
              <hr className='border-light ' style={{"borderWidth":3}}></hr>
            <BsGithub size="1.25em" color='white' align='left'/><label className='text-light'>&nbsp;&nbsp;&nbsp;/github</label>
            <br></br>
            <BsFacebook size="1.25em" color='white' align='left'/><label className='text-light'>&nbsp;&nbsp;&nbsp;/facebook</label>
            <br></br>
            <BsGoogle size="1.25em" color='white' align='left'/><label className='text-light'>&nbsp;&nbsp;&nbsp;/google</label>
            </div>


  <div className='col sm-4' style={{padding:10}} >
    <h4 className='text-light'>About Us</h4>
    <hr className='border-light' style={{"borderWidth":3}}></hr>
    <p className='text-light'>
Retail Banking System is a 'Full Service Commercial 'Bank' providing a complete range of products, services and technology driven digital offerings, catering to Retail, MSME as well as corporate clients.</p>
  </div>
    <div className='col sm-4' align='left'>
  <CarouselTest/>
  </div>
  </div>
</footer>

    </div>


  )
}

export default Footer
import React from 'react'

import { Carousel } from 'react-bootstrap'

function CarouselCustomer() {
  return (
    <div className='container-fluid'align='left'>
      <Carousel align='left'>
      <Carousel.Item interval={1250}>
        <img
          
          src="./images/atmservice.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1250}>
        <img
          
          src="./images/creditservice.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1250}>
        <img
          
          src="./images/mobilebanking.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default CarouselCustomer
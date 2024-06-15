import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div style={{backgroundColor:'black'}}>
      <div>
        <Navbar/>
      </div>
       <div className="container">
       Welcome to YumCourier, where we transform meal times into delightful experiences with a simple click. Founded in 2024 by a team of passionate food enthusiasts, we connect you with a diverse array of culinary delights from local favorites to popular chains, all delivered fresh and hot to your door. Our mission is to provide convenience, quality, and variety, ensuring every meal is a memorable one. With our user-friendly platform and dedicated customer service, we strive to make enjoying great food as easy and enjoyable as possible. Thank you for choosing YumCourier.
       </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

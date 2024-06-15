import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensure the container stretches to full viewport height
};

const contentStyle = {
  flex: 1, // Grow to fill available space
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem', // Increase font size
  textAlign: 'center', // Center align text
  transition: 'all 0.5s ease', // Add transition effect
};

const footerStyle = {
  flexShrink: 0, // Ensure footer doesn't shrink
};

export default function About() {
  return (
    <div style={{backgroundColor:'black'}}>
        <div style={containerStyle}>
      <Navbar />
      <div className="container" style={contentStyle}>
        Welcome to YumCourier, where we transform meal times into delightful experiences with a simple click. Founded in 2024 by a team of passionate food enthusiasts, we connect you with a diverse array of culinary delights from local favorites to popular chains, all delivered fresh and hot to your door. Our mission is to provide convenience, quality, and variety, ensuring every meal is a memorable one. With our user-friendly platform and dedicated customer service, we strive to make enjoying great food as easy and enjoyable as possible. Thank you for choosing YumCourier.
      </div>
      <Footer style={footerStyle} />
    </div>
    </div>
  );
}

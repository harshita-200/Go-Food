import React, { useEffect } from 'react';
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
  opacity: 0,
  animation: 'slideIn 1s forwards' // Apply the animation
};

const About = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0]; // Replace with correct index or reference
    const keyframes = `
      @keyframes slideIn {
        0% {
          transform: translateY(50%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []); // Run once after component mounts

  return (
    <div style={containerStyle}>
      <Navbar />
      <div className="container" style={contentStyle}>
        Welcome to YumCourier, where we transform meal times into delightful experiences with a simple click. Founded in 2024 by a team of passionate food enthusiasts, we connect you with a diverse array of culinary delights from local favorites to popular chains, all delivered fresh and hot to your door. Our mission is to provide convenience, quality, and variety, ensuring every meal is a memorable one. With our user-friendly platform and dedicated customer service, we strive to make enjoying great food as easy and enjoyable as possible. Thank you for choosing YumCourier.
      </div>
      <Footer style={{ flexShrink: 0 }} /> {/* Ensure Footer sticks to the bottom */}
    </div>
  );
};

export default About;

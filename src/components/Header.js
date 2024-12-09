import React from 'react';
import logo from '../assets/Logo.jpg';  
import fittingImage from '../assets/BookPhoto.png';  

function Header({ isLoginPage }) {
  return (
    <div className="header">
      <img src={logo} alt="App Logo" className="app-logo" />
      {!isLoginPage && <img src={fittingImage} alt="Fitting Image" className="fitting-image" />}
    </div>
  );
}

export default Header;
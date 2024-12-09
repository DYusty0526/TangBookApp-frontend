import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHomePage.css';
import Header from './Header';

function AdminHomePage() {
  return (
    <div className="adminhome-container">
      <div className="adminhome-box">
        <Header isLoginPage={false} /> 

        <h2>Welcome Admin</h2>

        <div className="buttons-container">
          <Link to="/addbook" className="admin-btn">Add Book</Link>
          <Link to="/editbooklist" className="admin-btn">Edit Book</Link>
        </div>

        <div className="footer">
          <Link to="/login" className="exit-btn">Exit</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;

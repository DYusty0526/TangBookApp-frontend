import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './LoginPage.css';
import Header from './Header';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // For showing login errors
  const navigate = useNavigate(); // Use to navigate to admin page after login

  // Handle input change for username and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    try {
      // Send POST request to the backend to log in
      const response = await axios.post('http://localhost:7000/login', credentials);

      // Store the JWT token in localStorage
      localStorage.setItem('jwtToken', response.data.token);

      // Navigate to Admin Home page after successful login
      navigate('/adminhome');
    } catch (error) {
      // Display error message if login fails
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Header isLoginPage={true} /> 

        <h1>Welcome to the TangBookApp!</h1>
        <h2>Login</h2>

        {/* Display error message if credentials are incorrect */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="login-btn">
              Login
            </button>
            <button
              type="button"
              className="guest-btn"
              onClick={() => navigate('/userhome')}
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

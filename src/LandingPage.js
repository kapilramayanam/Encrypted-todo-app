// src/pages/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Navigate } from 'react-router-dom';

function LandingPage() {
    // const handleSignupRedirect = () => {
    //     window.location.assign('/Signup');      };
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Encrypted To-Do List</h1>
      <p className="landing-subtitle">Securely manage and share your tasks with peace of mind.</p>
      <div className="landing-buttons">
      <button className="btn login-btn" onClick={() => Navigate('/Login')}>Login</button>
      {/* <button className="btn signup-btn"   >Sign Up</button> */}
      <button className="btn Signup-btn" onClick={() => Navigate('/Signup')}>Sign up</button>

      </div>
    </div>
  );
}


export default LandingPage;

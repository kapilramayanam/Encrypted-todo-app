import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; // Or your CSS file for styling
import './LandingPage.css';
import './Signup.css'
// LandingPage Component
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Encrypted To-Do List</h1>
      <p className="landing-subtitle">Securely manage and share your tasks with peace of mind.</p>
      <div className="landing-buttons">
        <button className="btn login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn signup-btn" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

// Signup Component
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName,setLastName]= useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Here you would typically send the data to the backend
    console.log('Signup data:', { firstName, lastName, email, password });

    // Redirect to login or another page
    navigate('/login');
  };


  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
    
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );

  
}

export default App;

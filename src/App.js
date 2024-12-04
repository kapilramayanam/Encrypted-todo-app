import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './LandingPage.css';
import './Signup.css';
import TodoList from './TodoList';
// import Login from './Login'; // Import Login Page
import './Login.css';

// LandingPage Component
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Encrypted To-Do List</h1>
      <p className="landing-subtitle">Securely manage and share your tasks with peace of mind.</p>
      <div className="landing-buttons">
        <button
          className="btn login-btn"
          aria-label="Navigate to Login"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="btn signup-btn"
          aria-label="Navigate to Sign Up"
          onClick={() => navigate('/signup')}
        >
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
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess(false);
      return;
    }

    // Save user details in localStorage (for demo purposes, backend integration needed)
    const user = { firstName, lastName, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    setSuccess(true);
    setError('');
    console.log('Signup successful:', user);
    navigate('/tasks');
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Signup successful! Redirecting...</p>}
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

// Login Component
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`/users/validate?email=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please try again.');
        return;
      }

      // Save the token in localStorage and redirect to tasks page
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
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
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/tasks" element={<TodoList />} /> {/* To-do list */}
      </Routes>
    </Router>
  );
}

export default App;

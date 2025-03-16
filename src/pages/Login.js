import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/global.css';

const Login = () => {
  const { keycloak, initialized } = useAuth();
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && isAuthenticated) {
      navigate('/');
    }
  }, [initialized, isAuthenticated, navigate]);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <h1>Login to Your Account</h1>
        <p>Sign in to access your account and manage your orders</p>
        
        {initialized ? (
          <Button onClick={handleLogin} variant="primary" size="large">
            Login with Keycloak
          </Button>
        ) : (
          <p>Initializing authentication...</p>
        )}
      </div>
    </div>
  );
};

export default Login;
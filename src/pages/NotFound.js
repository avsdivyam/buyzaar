import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/global.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Navbar />
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
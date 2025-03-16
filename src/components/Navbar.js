import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BuyZaar</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/products" className="navbar-item">Products</Link>
        <Link to="/cart" className="navbar-item">Cart</Link>
        <Link to="/login" className="navbar-item">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
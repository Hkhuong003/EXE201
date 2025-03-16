import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-icon" />
      </div>
      <nav className="nav-menu">
        <a href="#">BOOKING</a>
        <a href="#">ABOUT US</a>
        <a href="#">NEWS</a>
      </nav>
      <div className="user-icon">
        <UserOutlined />
      </div>
    </header>
  );
};

export default Header;
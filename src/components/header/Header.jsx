import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.scss';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'sign-in') {
      navigate('/login');
    } 
  };

  const handleBookingClick = () => {
    navigate('/search-page');
  };

  const handleAboutUsClick = () => {
    navigate('/about-us');
  };

  const handleNewsClick = () => {
    navigate('/news');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
   
    navigate('/login');
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {!isLoggedIn ? (
        <Menu.Item key="sign-in">Sign In</Menu.Item>
      ) : (
        <>
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="log-out" onClick={handleLogout}>Log Out</Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-icon" />
      </div>
      <nav className="nav-menu">
        <a onClick={handleBookingClick} style={{ cursor: 'pointer' }}>
          BOOKING
        </a>
        <a onClick={handleAboutUsClick} style={{ cursor: 'pointer' }}>
          ABOUT US
        </a>
        <a onClick={handleNewsClick} style={{ cursor: 'pointer' }}>
          NEWS
        </a>
      </nav>
      <div className="user-icon">
        <Dropdown overlay={menu} trigger={['click']}>
          <span>
            <UserOutlined />
          </span>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Thêm useAuth
import logo from '../../assets/logo.png';
import './Header.scss';

const Header = ({ className }) => {
  const { user, logout } = useAuth(); // Lấy user và logout từ AuthContext
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'sign-in') {
      navigate('/login');
    }
  };

  const handleBookingClick = () => {
    navigate('/search-page');
  };

  const handleAboutUsClick = () => {
    navigate('/about-us');
  };

  const handleHistorysClick = () => {
    navigate('/history');
  };

  const handleLogout = () => {
    logout(); // Gọi logout từ AuthContext
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {user ? (
        <Menu.Item key="log-out" onClick={handleLogout}>Log Out</Menu.Item>
      ) : (
        <Menu.Item key="sign-in">Sign In</Menu.Item>
      )}
    </Menu>
  );

  return (
    <header className={`header ${className || ''}`}>
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" className="logo-icon" />
      </div>
      <nav className="nav-menu">
        <a onClick={handleBookingClick} style={{ cursor: 'pointer' }}>
          BOOKING
        </a>
        <a onClick={handleAboutUsClick} style={{ cursor: 'pointer' }}>
          ABOUT US
        </a>
        <a onClick={handleHistorysClick} style={{ cursor: 'pointer' }}>
          HISTORY
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
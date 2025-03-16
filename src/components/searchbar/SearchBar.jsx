import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Nơi đón" />
      <input type="date" placeholder="Từ ngày" />
      <input type="date" placeholder="Đến ngày" />
      <button className="search-button">
        <SearchOutlined /> Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;

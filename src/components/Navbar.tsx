import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Group, MediaQuery, TextInput } from '@mantine/core';
import { useAppStore } from '../store/app.store';
import logo from '../assets/logo.svg'; 

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Group position="apart" style={{ padding: '20px', background: '#6F728F' }}>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
      </Link>
      {isAuthenticated ? (
        <>
          <MediaQuery smallerThan="sm" styles={{ width: '100%' }}>
            <TextInput
              placeholder="Search by Name"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flex: 1, maxWidth: '300px', margin: '0 10px' }}
            />
          </MediaQuery>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </Group>
  );
};

export default Navbar;

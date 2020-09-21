import React, { FC } from 'react';
import logo from './logo.svg';
import './header.css';

export const Header: FC = () => (
  <header className="header">
    <img src={logo} alt="logo" />
  </header>
);

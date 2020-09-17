import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import './header.css';

export const Header: FunctionComponent = () => (
  <header className="header">
    <img src={logo} alt="logo" />
  </header>
);

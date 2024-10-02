/* eslint-disable no-unused-vars */
import React from 'react';
import './Layout.css';
import { Footer } from './Footer';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;

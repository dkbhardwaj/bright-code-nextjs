import React, { ReactNode } from 'react';
import Header from '../components/navigation'; // Uncomment this line
import Footer from '../components/footer'; // Uncomment this line
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header /> {/* Uncomment this line */}
      {children}
      <Footer /> {/* Uncomment this line */}
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> */}
    </>
  );
};

export default Layout;

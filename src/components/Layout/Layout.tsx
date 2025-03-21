import React, { ReactNode } from 'react'
import Header from './Header/Header'
import Nav from './Nav/Nav'
import Footer from './Footer/Footer'
import "./Layout.css"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => (
  <div>
    <Header />
    <Nav />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout
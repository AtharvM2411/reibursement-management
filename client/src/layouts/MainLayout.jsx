
import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const MainLayout = ({ children, sidebarItems }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="layout-content">
        <Sidebar items={sidebarItems} />
        <main className="main-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

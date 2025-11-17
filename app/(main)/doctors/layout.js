import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto py-28">
      {children}
    </div>
  );
};

export default MainLayout;

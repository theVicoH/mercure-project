import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default Layout;

// src/layouts/AuthLayout.tsx

import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

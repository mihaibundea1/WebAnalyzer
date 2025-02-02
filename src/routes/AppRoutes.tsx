// src/routes/AppRoutes.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardLayout from '../layouts/DashboardLayout'
import PatientDashboard from '../pages/Dashboard/PatientDashboard';
// Importă și alte layout-uri/pagini, de ex. DashboardLayout

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* Rutele pentru autentificare */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Alte rute, de ex.: Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<PatientDashboard />} />
              {/* <Route path="doctor" element={<DoctorDashboard />} /> */}
          </Route>

        {/* Ruta fallback (Not Found) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

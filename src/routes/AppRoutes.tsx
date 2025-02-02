// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
// import NotFound from '../pages/NotFound'; // când vei avea componenta

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard Routes - decomentează când ai componentele */}
      {/* <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route> */}

      {/* 404 Route */}
      <Route path="*" element={<div>Pagina nu a fost găsită</div>} />
    </Routes>
  );
};

export default AppRoutes;
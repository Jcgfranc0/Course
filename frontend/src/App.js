import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GastosPage from './pages/GastosPage';
import MantenimientoPage from './pages/MantenimientoPage';
import MisRecibosPage from './pages/MisRecibosPage';
import ReciboDetailPage from './pages/ReciboDetailPage';
import PublicacionesPage from './pages/PublicacionesPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Protegidas con el Layout Principal */}
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/gastos" element={<GastosPage />} />
            <Route path="/mantenimientos" element={<MantenimientoPage />} />
            <Route path="/mis-recibos" element={<MisRecibosPage />} />
            <Route path="/recibos/:id" element={<ReciboDetailPage />} />
            <Route path="/publicaciones" element={<PublicacionesPage />} />
            {/* La ruta raíz también será el dashboard protegido */}
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
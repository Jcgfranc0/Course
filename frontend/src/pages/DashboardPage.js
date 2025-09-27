import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import PropietarioDashboard from '../components/PropietarioDashboard';

// Estilos
const dashboardStyles = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
};

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
};

const logoutButtonStyle = {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
};

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={dashboardStyles}>
            <header style={headerStyles}>
                <div>
                    <h1>Bienvenido, {user?.username || 'Usuario'}!</h1>
                </div>
                <button onClick={logout} style={logoutButtonStyle}>
                    Cerrar Sesión
                </button>
            </header>

            {/* Renderizado condicional basado en el rol del usuario */}
            {user && user.role === 'admin' ? <AdminDashboard /> : <PropietarioDashboard />}
        </div>
    );
};

export default DashboardPage;
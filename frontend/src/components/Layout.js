import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// --- Estilos (sin cambios) ---
const layoutStyle = { display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' };
const sidebarStyle = { width: '250px', background: '#2c3e50', color: 'white', padding: '1rem' };
const sidebarLinkStyle = { display: 'block', color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '5px', marginBottom: '0.5rem' };
const contentStyle = { flexGrow: 1, padding: '2rem', overflowY: 'auto', background: '#f4f6f9' };
// --- Fin Estilos ---

const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);

    const adminLinks = (
        <>
            <Link to="/dashboard" style={sidebarLinkStyle}>Dashboard</Link>
            <Link to="/gastos" style={sidebarLinkStyle}>Gestión de Gastos</Link>
            <Link to="/mantenimientos" style={sidebarLinkStyle}>Mantenimientos</Link>
            <Link to="/publicaciones" style={sidebarLinkStyle}>Publicaciones</Link>
            {/* Próximamente: Generar Recibos */}
        </>
    );

    const propietarioLinks = (
        <>
            <Link to="/dashboard" style={sidebarLinkStyle}>Mi Resumen</Link>
            <Link to="/mis-recibos" style={sidebarLinkStyle}>Mis Recibos</Link>
            <Link to="/publicaciones" style={sidebarLinkStyle}>Publicaciones</Link>
        </>
    );

    return (
        <div style={layoutStyle}>
            <aside style={sidebarStyle}>
                <h2>Gestión Edificio</h2>
                <nav>
                    {user && user.role === 'admin' ? adminLinks : propietarioLinks}
                </nav>
            </aside>
            <main style={contentStyle}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
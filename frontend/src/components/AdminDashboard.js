import React from 'react';

// Estilos para los componentes del Dashboard
const cardContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
};

const cardStyles = {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderLeft: '5px solid #007bff'
};

const AdminDashboard = () => {
    return (
        <div>
            <p>Este es el resumen general de la gestión del edificio.</p>
            <div style={{...cardContainerStyles, marginTop: '2rem'}}>
                <div style={cardStyles}>
                    <h3>Gastos del Mes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>S/ 0.00</p>
                    <small>Dato de ejemplo</small>
                </div>
                <div style={cardStyles}>
                    <h3>Mantenimientos Pendientes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                    <small>Dato de ejemplo</small>
                </div>
                <div style={cardStyles}>
                    <h3>Propietarios Registrados</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>1</p>
                    <small>Dato de ejemplo</small>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
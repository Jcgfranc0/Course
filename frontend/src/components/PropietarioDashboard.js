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
    borderLeft: '5px solid #28a745' // Un color diferente para el dashboard del propietario
};

const PropietarioDashboard = () => {
    return (
        <div>
            <p>Aquí encontrarás un resumen de tu estado de cuenta y las últimas novedades.</p>
            <div style={{...cardContainerStyles, marginTop: '2rem'}}>
                <div style={cardStyles}>
                    <h3>Monto de tu Último Recibo</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>S/ 0.00</p>
                    <small>Pendiente de pago</small>
                </div>
                <div style={cardStyles}>
                    <h3>Próximo Mantenimiento</h3>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Limpieza de Tanques</p>
                    <small>Fecha: 30/10/2023 (Ejemplo)</small>
                </div>
                <div style={cardStyles}>
                    <h3>Último Comunicado</h3>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Recordatorio de pago</p>
                    <small>Publicado: hace 2 días</small>
                </div>
            </div>
        </div>
    );
};

export default PropietarioDashboard;
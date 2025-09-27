import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import reciboService from '../services/reciboService';
import { toast } from 'react-toastify';

// --- Estilos ---
const pageStyles = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
const tableStyles = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const thStyles = { backgroundColor: '#f8f9fa', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' };
const tdStyles = { padding: '0.75rem', borderBottom: '1px solid #dee2e6' };
const statusPaidStyle = { color: 'green', fontWeight: 'bold' };
const statusPendingStyle = { color: 'red', fontWeight: 'bold' };
const buttonLinkStyle = {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
};
// --- Fin Estilos ---

const MisRecibosPage = () => {
    const [recibos, setRecibos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecibos = async () => {
            try {
                const data = await reciboService.getMyReceipts();
                setRecibos(data);
            } catch (error) {
                toast.error('No se pudieron cargar tus recibos.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecibos();
    }, []);

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('es-ES', { month: 'long' });
    };

    if (loading) {
        return <div style={pageStyles}>Cargando tus recibos...</div>;
    }

    return (
        <div style={pageStyles}>
            <header>
                <h1>Mis Recibos Mensuales</h1>
                <p>Aquí puedes ver el historial de tus pagos y los detalles de cada mes.</p>
            </header>

            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Período</th>
                        <th style={thStyles}>Monto Total</th>
                        <th style={thStyles}>Estado</th>
                        <th style={thStyles}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recibos.length > 0 ? (
                        recibos.map((recibo) => (
                            <tr key={recibo._id}>
                                <td style={tdStyles}>{getMonthName(recibo.month)} {recibo.year}</td>
                                <td style={tdStyles}>S/ {recibo.totalAmount.toFixed(2)}</td>
                                <td style={tdStyles}>
                                    <span style={recibo.isPaid ? statusPaidStyle : statusPendingStyle}>
                                        {recibo.isPaid ? 'Pagado' : 'Pendiente'}
                                    </span>
                                </td>
                                <td style={tdStyles}>
                                    <Link to={`/recibos/${recibo._id}`} style={buttonLinkStyle}>
                                        Ver Detalle
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ ...tdStyles, textAlign: 'center' }}>
                                Aún no tienes recibos generados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MisRecibosPage;
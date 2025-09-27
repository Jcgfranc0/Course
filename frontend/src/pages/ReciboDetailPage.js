import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import reciboService from '../services/reciboService';
import { toast } from 'react-toastify';

// --- Estilos ---
const pageStyles = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
const headerStyles = { borderBottom: '2px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' };
const tableStyles = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const thStyles = { backgroundColor: '#f8f9fa', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' };
const tdStyles = { padding: '0.75rem', borderBottom: '1px solid #dee2e6' };
// --- Fin Estilos ---

const ReciboDetailPage = () => {
    const [recibo, setRecibo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Obtener el ID del recibo de la URL

    useEffect(() => {
        const fetchRecibo = async () => {
            try {
                const data = await reciboService.getReciboById(id);
                setRecibo(data);
            } catch (error) {
                toast.error('No se pudo cargar el detalle del recibo.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecibo();
    }, [id]);

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('es-ES', { month: 'long' });
    };

    if (loading) {
        return <div style={pageStyles}>Cargando detalle...</div>;
    }

    if (!recibo) {
        return <div style={pageStyles}>No se encontró el recibo.</div>;
    }

    return (
        <div style={pageStyles}>
            <header style={headerStyles}>
                <h1>Detalle del Recibo</h1>
                <p><strong>Período:</strong> {getMonthName(recibo.month)} {recibo.year}</p>
                <p><strong>Propietario:</strong> {recibo.user.username}</p>
                <h2 style={{marginTop: '1rem'}}>Monto Total: S/ {recibo.totalAmount.toFixed(2)}</h2>
            </header>

            <h3>Desglose de Gastos</h3>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Descripción del Gasto</th>
                        <th style={thStyles}>Monto</th>
                        <th style={thStyles}>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {recibo.gastos.map((gasto) => (
                        <tr key={gasto._id}>
                            <td style={tdStyles}>{gasto.description}</td>
                            <td style={tdStyles}>S/ {gasto.amount.toFixed(2)}</td>
                            <td style={tdStyles}>{new Date(gasto.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReciboDetailPage;
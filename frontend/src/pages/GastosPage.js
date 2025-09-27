import React, { useState, useEffect } from 'react';
import gastoService from '../services/gastoService';
import uploadService from '../services/uploadService'; // Importar el servicio de subida
import { toast } from 'react-toastify';
import GastoFormModal from '../components/GastoFormModal';

// --- Estilos ---
const pageStyles = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
const tableStyles = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const thStyles = { backgroundColor: '#f8f9fa', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' };
const tdStyles = { padding: '0.75rem', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' };
const buttonStyles = { padding: '0.7rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' };
const deleteButtonStyles = { padding: '0.4rem 0.8rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '0.5rem' };
const editButtonStyles = { ...deleteButtonStyles, background: '#ffc107', color: 'black' };
const linkStyle = { color: '#007bff', textDecoration: 'none' };
// --- Fin Estilos ---

const GastosPage = () => {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchGastos();
    }, []);

    const fetchGastos = async () => {
        try {
            const data = await gastoService.getGastos();
            setGastos(data);
        } catch (error) {
            toast.error('No se pudieron cargar los gastos.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveGasto = async (gastoData, selectedFile) => {
        try {
            let fileUrl = '';
            if (selectedFile) {
                // 1. Subir el archivo si existe
                toast.info('Subiendo archivo...');
                const uploadResponse = await uploadService.uploadFile(selectedFile);
                fileUrl = uploadResponse.filePath;
            }

            // 2. Crear el gasto con la URL del archivo (si se subió)
            const finalGastoData = {
                ...gastoData,
                invoiceFile: fileUrl,
            };

            const nuevoGasto = await gastoService.createGasto(finalGastoData);
            setGastos([nuevoGasto, ...gastos]);
            toast.success('¡Gasto añadido con éxito!');
            setIsModalOpen(false);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 'Error al añadir el gasto.';
            toast.error(message);
        }
    };

    const handleDeleteGasto = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
            try {
                await gastoService.deleteGasto(id);
                setGastos(gastos.filter((gasto) => gasto._id !== id));
                toast.success('Gasto eliminado con éxito.');
            } catch (error) {
                toast.error('Error al eliminar el gasto.');
            }
        }
    };

    if (loading) {
        return <div style={pageStyles}>Cargando gastos...</div>;
    }

    return (
        <div style={pageStyles}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Gestión de Gastos</h1>
                <button onClick={() => setIsModalOpen(true)} style={buttonStyles}>Añadir Gasto</button>
            </header>

            <GastoFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGasto}
            />

            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Descripción</th>
                        <th style={thStyles}>Monto</th>
                        <th style={thStyles}>Tipo</th>
                        <th style={thStyles}>Fecha</th>
                        <th style={thStyles}>Factura</th>
                        <th style={thStyles}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.length > 0 ? (
                        gastos.map((gasto) => (
                            <tr key={gasto._id}>
                                <td style={tdStyles}>{gasto.description}</td>
                                <td style={tdStyles}>S/ {gasto.amount.toFixed(2)}</td>
                                <td style={tdStyles}>{gasto.type}</td>
                                <td style={tdStyles}>{new Date(gasto.date).toLocaleDateString()}</td>
                                <td style={tdStyles}>
                                    {gasto.invoiceFile ? (
                                        <a href={`http://localhost:5000${gasto.invoiceFile}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                                            Ver Archivo
                                        </a>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td style={tdStyles}>
                                    <button style={editButtonStyles}>Editar</button>
                                    <button onClick={() => handleDeleteGasto(gasto._id)} style={deleteButtonStyles}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ ...tdStyles, textAlign: 'center' }}>
                                No hay gastos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GastosPage;
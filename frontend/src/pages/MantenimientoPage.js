import React, { useState, useEffect } from 'react';
import mantenimientoService from '../services/mantenimientoService';
import { toast } from 'react-toastify';
import MantenimientoFormModal from '../components/MantenimientoFormModal'; // Importar el modal

// --- Estilos ---
const pageStyles = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
const tableStyles = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const thStyles = { backgroundColor: '#f8f9fa', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' };
const tdStyles = { padding: '0.75rem', borderBottom: '1px solid #dee2e6', verticalAlign: 'middle' };
const buttonStyles = { padding: '0.7rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' };
const deleteButtonStyles = { padding: '0.4rem 0.8rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '0.5rem' };
const editButtonStyles = { ...deleteButtonStyles, background: '#ffc107', color: 'black' };
// --- Fin Estilos ---

const MantenimientoPage = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mantenimientoToEdit, setMantenimientoToEdit] = useState(null);

    useEffect(() => {
        fetchMantenimientos();
    }, []);

    const fetchMantenimientos = async () => {
        try {
            const data = await mantenimientoService.getMantenimientos();
            setMantenimientos(data);
        } catch (error) {
            toast.error('No se pudieron cargar los registros de mantenimiento.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (mantenimiento = null) => {
        setMantenimientoToEdit(mantenimiento);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setMantenimientoToEdit(null);
        setIsModalOpen(false);
    };

    const handleSave = async (formData) => {
        try {
            if (mantenimientoToEdit) {
                // Actualizar
                const updated = await mantenimientoService.updateMantenimiento(mantenimientoToEdit._id, formData);
                setMantenimientos(mantenimientos.map((item) => (item._id === updated._id ? updated : item)));
                toast.success('¡Mantenimiento actualizado!');
            } else {
                // Crear
                const created = await mantenimientoService.createMantenimiento(formData);
                setMantenimientos([created, ...mantenimientos]);
                toast.success('¡Mantenimiento añadido!');
            }
            handleCloseModal();
        } catch (error) {
            toast.error('Error al guardar el registro.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                await mantenimientoService.deleteMantenimiento(id);
                setMantenimientos(mantenimientos.filter((item) => item._id !== id));
                toast.success('Registro eliminado.');
            } catch (error) {
                toast.error('Error al eliminar el registro.');
            }
        }
    };

    if (loading) {
        return <div style={pageStyles}>Cargando mantenimientos...</div>;
    }

    return (
        <div style={pageStyles}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Gestión de Mantenimientos</h1>
                <button onClick={() => handleOpenModal()} style={buttonStyles}>Añadir Mantenimiento</button>
            </header>

            <MantenimientoFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                mantenimientoToEdit={mantenimientoToEdit}
            />

            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Título</th>
                        <th style={thStyles}>Tipo</th>
                        <th style={thStyles}>Estado</th>
                        <th style={thStyles}>Fecha</th>
                        <th style={thStyles}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mantenimientos.length > 0 ? (
                        mantenimientos.map((item) => (
                            <tr key={item._id}>
                                <td style={tdStyles}>{item.title}</td>
                                <td style={tdStyles}>{item.type}</td>
                                <td style={tdStyles}>{item.status}</td>
                                <td style={tdStyles}>{new Date(item.date).toLocaleDateString()}</td>
                                <td style={tdStyles}>
                                    <button onClick={() => handleOpenModal(item)} style={editButtonStyles}>Editar</button>
                                    <button onClick={() => handleDelete(item._id)} style={deleteButtonStyles}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ ...tdStyles, textAlign: 'center' }}>
                                No hay registros de mantenimiento.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MantenimientoPage;
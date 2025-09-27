import React, { useState, useEffect } from 'react';

// --- Estilos para el Modal (reutilizados) ---
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' };
const modalHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' };
const closeButtonStyle = { background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' };
const formGroupStyle = { marginBottom: '1rem' };
const labelStyle = { display: 'block', marginBottom: '0.5rem' };
const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const buttonContainerStyle = { textAlign: 'right', marginTop: '1.5rem' };
// --- Fin de Estilos ---

const MantenimientoFormModal = ({ isOpen, onClose, onSave, mantenimientoToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'preventivo',
        status: 'pendiente',
    });

    useEffect(() => {
        // Si pasamos un mantenimiento para editar, llenamos el formulario con sus datos
        if (mantenimientoToEdit) {
            setFormData({
                title: mantenimientoToEdit.title,
                description: mantenimientoToEdit.description,
                type: mantenimientoToEdit.type,
                status: mantenimientoToEdit.status,
            });
        } else {
            // Si no, es un formulario para crear, lo reseteamos
            setFormData({
                title: '',
                description: '',
                type: 'preventivo',
                status: 'pendiente',
            });
        }
    }, [mantenimientoToEdit, isOpen]);

    const { title, description, type, status } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <div style={modalHeaderStyle}>
                    <h2>{mantenimientoToEdit ? 'Editar' : 'Añadir'} Mantenimiento</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Título</label>
                        <input type="text" name="title" value={title} onChange={onChange} style={inputStyle} required />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Descripción</label>
                        <textarea name="description" value={description} onChange={onChange} style={{...inputStyle, height: '100px'}} required />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Tipo</label>
                        <select name="type" value={type} onChange={onChange} style={inputStyle}>
                            <option value="preventivo">Preventivo</option>
                            <option value="correctivo">Correctivo</option>
                        </select>
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Estado</label>
                        <select name="status" value={status} onChange={onChange} style={inputStyle}>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_progreso">En Progreso</option>
                            <option value="completado">Completado</option>
                        </select>
                    </div>
                    <div style={buttonContainerStyle}>
                        <button type="button" onClick={onClose} style={{ marginRight: '1rem' }}>Cancelar</button>
                        <button type="submit" style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem' }}>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MantenimientoFormModal;
import React, { useState } from 'react';

// --- Estilos para el Modal (sin cambios) ---
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};
const modalContentStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
};
const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '1rem',
    marginBottom: '1rem',
};
const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
};
const formGroupStyle = {
    marginBottom: '1rem',
};
const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
};
const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
};
const buttonContainerStyle = {
    textAlign: 'right',
    marginTop: '1.5rem',
};
// --- Fin de Estilos ---

const GastoFormModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'variable',
        date: new Date().toISOString().split('T')[0],
    });
    const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo

    const { description, amount, type, date } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Guardar el archivo seleccionado
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pasamos tanto los datos del formulario como el archivo seleccionado
        onSave(formData, selectedFile);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <div style={modalHeaderStyle}>
                    <h2>Añadir Nuevo Gasto</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Descripción</label>
                        <input type="text" name="description" value={description} onChange={onChange} style={inputStyle} required />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Monto (S/)</label>
                        <input type="number" name="amount" value={amount} onChange={onChange} style={inputStyle} required />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Tipo</label>
                        <select name="type" value={type} onChange={onChange} style={inputStyle}>
                            <option value="variable">Variable</option>
                            <option value="fijo">Fijo</option>
                        </select>
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Fecha</label>
                        <input type="date" name="date" value={date} onChange={onChange} style={inputStyle} required />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Adjuntar Factura (Opcional)</label>
                        <input type="file" name="invoiceFile" onChange={onFileChange} style={inputStyle} />
                    </div>
                    <div style={buttonContainerStyle}>
                        <button type="button" onClick={onClose} style={{ marginRight: '1rem' }}>Cancelar</button>
                        <button type="submit" style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem' }}>Guardar Gasto</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GastoFormModal;
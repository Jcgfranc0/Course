import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            toast.success('¡Inicio de sesión exitoso!');
            navigate('/dashboard'); // Redirigir al dashboard después del login
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.msg) || 'Error al iniciar sesión';
            toast.error(message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Nombre de Usuario</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.7rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
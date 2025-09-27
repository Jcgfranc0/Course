import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si el usuario está autenticado, renderizamos el componente hijo (la página protegida).
    // El componente <Outlet /> actúa como un marcador de posición para el contenido de la ruta anidada.
    // Si no está autenticado, lo redirigimos a la página de login.
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
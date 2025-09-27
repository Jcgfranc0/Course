import axios from 'axios';

// La URL base de nuestra API del backend.
// En un entorno de producción, esto debería ser una variable de entorno.
const API_URL = 'http://localhost:5000/api/users/';

// Función para iniciar sesión
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        // Si el login es exitoso, guardamos el token en el almacenamiento local del navegador.
        // El almacenamiento local es persistente, por lo que el usuario seguirá logueado si cierra la pestaña.
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Función para cerrar sesión (logout)
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    login,
    logout,
};

export default authService;
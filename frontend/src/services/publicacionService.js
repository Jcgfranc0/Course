import axios from 'axios';

const API_URL = 'http://localhost:5000/api/publicaciones/';

// Función para obtener el token del usuario desde el localStorage
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
};

// Configuración del header con el token de autorización
const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            'x-auth-token': token
        }
    };
};

// Obtener todas las publicaciones
const getPublicaciones = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Crear una nueva publicación (para el admin)
const createPublicacion = async (content) => {
    const config = getConfig();
    const response = await axios.post(API_URL, { content }, config);
    return response.data;
};


const publicacionService = {
    getPublicaciones,
    createPublicacion,
};

export default publicacionService;
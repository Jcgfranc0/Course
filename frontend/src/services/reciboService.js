import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recibos/';

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

// Obtener los recibos del propietario autenticado
const getMyReceipts = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL + 'my-receipts', config);
    return response.data;
};

// --- Funciones para el Administrador (pueden ser útiles más adelante) ---

// Generar recibos para un mes
const generateReceipts = async (month, year) => {
    const config = getConfig();
    const response = await axios.post(API_URL + 'generate', { month, year }, config);
    return response.data;
};

// Obtener todos los recibos (vista de admin)
const getAllReceipts = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
};


// Obtener un recibo por su ID
const getReciboById = async (id) => {
    const config = getConfig();
    const response = await axios.get(API_URL + id, config);
    return response.data;
};

const reciboService = {
    getMyReceipts,
    getReciboById,
    generateReceipts,
    getAllReceipts,
};

export default reciboService;
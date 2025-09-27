import axios from 'axios';

const API_URL = 'http://localhost:5000/api/gastos/';

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

// Obtener todos los gastos
const getGastos = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Crear un nuevo gasto
const createGasto = async (gastoData) => {
    const config = getConfig();
    const response = await axios.post(API_URL, gastoData, config);
    return response.data;
};

// Eliminar un gasto
const deleteGasto = async (id) => {
    const config = getConfig();
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};


const gastoService = {
    getGastos,
    createGasto,
    deleteGasto,
};

export default gastoService;
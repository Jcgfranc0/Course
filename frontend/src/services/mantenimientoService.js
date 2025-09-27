import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mantenimientos/';

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

// Obtener todos los registros de mantenimiento
const getMantenimientos = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Crear un nuevo registro de mantenimiento
const createMantenimiento = async (mantenimientoData) => {
    const config = getConfig();
    const response = await axios.post(API_URL, mantenimientoData, config);
    return response.data;
};

// Actualizar un registro de mantenimiento
const updateMantenimiento = async (id, mantenimientoData) => {
    const config = getConfig();
    const response = await axios.put(API_URL + id, mantenimientoData, config);
    return response.data;
};

// Eliminar un registro de mantenimiento
const deleteMantenimiento = async (id) => {
    const config = getConfig();
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const mantenimientoService = {
    getMantenimientos,
    createMantenimiento,
    updateMantenimiento,
    deleteMantenimiento,
};

export default mantenimientoService;
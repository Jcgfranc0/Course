import axios from 'axios';

const API_URL = 'http://localhost:5000/api/upload/';

// Función para obtener el token del usuario desde el localStorage
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
};

// Subir un archivo
const uploadFile = async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file); // 'file' debe coincidir con el nombre esperado en el backend (upload.single('file'))

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        }
    };

    const response = await axios.post(API_URL, formData, config);
    return response.data;
};

const uploadService = {
    uploadFile,
};

export default uploadService;
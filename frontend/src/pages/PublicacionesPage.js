import React, { useState, useEffect, useContext } from 'react';
import publicacionService from '../services/publicacionService';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

// --- Estilos ---
const pageStyles = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
const postCardStyles = {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};
const postHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#555',
    fontSize: '0.9rem',
    marginBottom: '1rem'
};
const formStyles = {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};
const textareaStyles = {
    width: '100%',
    minHeight: '80px',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
};
const submitButtonStyles = {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
};
// --- Fin Estilos ---

const PublicacionesPage = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchPublicaciones();
    }, []);

    const fetchPublicaciones = async () => {
        try {
            const data = await publicacionService.getPublicaciones();
            setPublicaciones(data);
        } catch (error) {
            toast.error('No se pudieron cargar las publicaciones.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) {
            toast.warn('La publicación no puede estar vacía.');
            return;
        }
        try {
            const nuevaPublicacion = await publicacionService.createPublicacion(newPostContent);
            setPublicaciones([nuevaPublicacion, ...publicaciones]);
            setNewPostContent('');
            toast.success('¡Publicación creada con éxito!');
        } catch (error) {
            toast.error('Error al crear la publicación.');
        }
    };

    const AdminPostForm = () => (
        <div style={formStyles}>
            <h2>Crear Nueva Publicación</h2>
            <form onSubmit={handleCreatePost}>
                <textarea
                    style={textareaStyles}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Escribe tu comunicado aquí..."
                    required
                />
                <button type="submit" style={submitButtonStyles}>Publicar Anuncio</button>
            </form>
        </div>
    );

    if (loading) {
        return <div style={pageStyles}>Cargando publicaciones...</div>;
    }

    return (
        <div style={pageStyles}>
            <header>
                <h1>Muro de Publicaciones</h1>
                <p>Aquí encontrarás los últimos anuncios y comunicados.</p>
            </header>

            {user && user.role === 'admin' && <AdminPostForm />}

            <div>
                {publicaciones.length > 0 ? (
                    publicaciones.map((post) => (
                        <div key={post._id} style={postCardStyles}>
                            <div style={postHeaderStyles}>
                                <strong>{post.author.username}</strong>
                                <span>{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay publicaciones para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default PublicacionesPage;
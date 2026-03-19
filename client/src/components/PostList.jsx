import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredPosts, deletePost } from '../store/postsSlice';
import { Table, Button, Badge } from 'react-bootstrap';

const PostList = () => {
    const filteredPosts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();
    const status = useSelector(state => state.posts.status);

    if (status === 'loading') {
        return <div className="text-center p-5">Cargando posts...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center p-5 text-danger">Error al cargar posts. ¿Está corriendo el Backend?</div>;
    }

    return (
        <div className="table-responsive">
            <Table bordered hover className="mb-0 border-dark" style={{ borderWidth: '2px' }}>
                <thead className="table-secondary border-dark">
                    <tr>
                        <th style={{ width: '25%' }}>Nombre</th>
                        <th style={{ width: '50%' }}>Descripción</th>
                        <th style={{ width: '25%' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.name}</td>
                                <td>{post.description}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        className="text-dark p-0"
                                        style={{ fontWeight: 'bold' }}
                                        onClick={() => dispatch(deletePost(post.id))}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center text-muted py-4">
                                No se encontraron posts.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PostList;

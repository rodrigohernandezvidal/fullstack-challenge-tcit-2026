import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './store/postsSlice';
import SearchBar from './components/SearchBar';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  const dispatch = useDispatch();
  const postStatus = useSelector(state => state.posts.status);

  // "Solo se debe llamar al endpoint".
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <Container className="py-5 bg-white" style={{ maxWidth: '900px', minHeight: '100vh' }}>
      <div className="border border-dark p-4" style={{ borderWidth: '3px' }}>
        <h1 className="mb-5 text-start fw-bold" style={{ letterSpacing: '-1px' }}>Challenge FullStack TCIT 🚀</h1>

        {/* Sección de Filtro */}
        <SearchBar />
        
        {/* Sección de Lista */}
        <PostList />

        {/* Sección de Formulario */}
        <PostForm />
      </div>
    </Container>
  );
};

export default App;

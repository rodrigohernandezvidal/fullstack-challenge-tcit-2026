const Post = require('../models/Post');

// 1. Obtener lista de posts
// GET /api/posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']] // Ordenar por más reciente
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

// 2. Crear Post
// POST /api/posts - Body: { name, description }
exports.createPost = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Simple Validation
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and Description are required' });
        }

        const newPost = await Post.create({ name, description });
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating post' });
    }
};

// 3. Eliminar Post
// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Buscamos el post antes de borrarlo
        const postToDelete = await Post.findByPk(id);

        if (!postToDelete) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // 2. Lo eliminamos
        await postToDelete.destroy();

        // 3. Retornamos el objeto eliminado (Requisito TCIT)
        res.json(postToDelete);
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
};

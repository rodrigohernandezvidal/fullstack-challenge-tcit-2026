const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/database');
const postRoutes = require('./src/routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir Frontend
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', postRoutes);

// Server Start
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();

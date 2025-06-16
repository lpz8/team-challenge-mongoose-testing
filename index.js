const express = require('express');
const connectDB = require('./config/config');
const postsRouter = require('./routes/posts');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} - Iniciado el ${new Date().toLocaleString('es-ES', { timeZone: 'CET', hour12: true })}`);
});
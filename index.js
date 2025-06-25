require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/config');
const postsRouter = require('./routes/posts');

const app = express();

// Configurar strictQuery para evitar la advertencia
mongoose.set('strictQuery', true);

connectDB();

app.use(express.json());
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 3000;
// Levantar el servidor solo si no estamos en el entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Exportar la app para usarla en los tests
module.exports = app;
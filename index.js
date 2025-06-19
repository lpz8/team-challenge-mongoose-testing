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
app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT} - Incluido el ${new Date().toLocaleString()}`);
});
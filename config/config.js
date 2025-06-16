require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('📡 Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor levantado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err);
  });

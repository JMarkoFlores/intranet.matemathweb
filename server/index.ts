import express from 'express';
import { handlePhishingApi, ensureDbReady } from './apiMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Permitir peticiones CORS si se consume la API externamente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Manejador de rutas API
app.use((req, res, next) => {
  handlePhishingApi(req, res, next);
});

app.listen(PORT, async () => {
  console.log(`[Backend Matemath] Servidor escuchando en el puerto ${PORT}`);
  await ensureDbReady();
});

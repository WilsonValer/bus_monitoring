// src/app.ts
import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', router);

export { app };

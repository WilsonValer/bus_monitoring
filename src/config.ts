// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';
export const DATABASE_URL = process.env.DATABASE_URL || '';

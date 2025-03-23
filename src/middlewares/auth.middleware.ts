// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config'; // Ajusta la ruta según tu proyecto

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return; // Asegúrate de terminar la ejecución
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Puedes anexar la info decodificada al request si quieres:
    (req as any).user = decoded;
    next(); // Continúa al siguiente middleware/controlador
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return; // Termina la ejecución aquí
  }
}

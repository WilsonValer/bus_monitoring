// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const prisma = new PrismaClient();

export async function loginService(username: string, password: string) {
  // Buscar usuario
  const user = await prisma.users_4G.findFirst({
    where: { username },
  });
  if (!user) throw new Error('El usuario no existe');

  // Comparar password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw new Error('Password incorrecto');

  // Generar token
  const token = jwt.sign(
    {
      userId: user.id,
      clientId: user.client_id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      client_id: user.client_id,
    },
  };
  
}

export async function registerService(
  username: string,
  password: string,
  client_id: string
) {
  // Verificar si existe un usuario con el mismo username
  const existingUser = await prisma.users_4G.findFirst({ where: { username } });
  if (existingUser) {
    throw new Error('El username ya está en uso');
  }

  // Encriptar password
  const hash = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const newUser = await prisma.users_4G.create({
    data: {
      username,
      password: hash,
      client_id,
    },
  });

  return newUser;
}


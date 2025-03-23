// src/services/user.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
  return prisma.users_4G.findMany();
}

export async function getUserById(id: number) {
  return prisma.users_4G.findUnique({
    where: { id },
  });
}


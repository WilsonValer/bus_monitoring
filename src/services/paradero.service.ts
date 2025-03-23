// src/services/paradero.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllParaderos() {
  return prisma.paraderos.findMany();
}

export async function getParaderoById(id: number) {
  return prisma.paraderos.findUnique({
    where: { id },
  });
}

export async function createParadero(data: {
  nombre: string;
  latitude: number;
  longitude: number;
  radio: number;
}) {
  return prisma.paraderos.create({ data });
}

export async function updateParadero(
  id: number,
  data: {
    nombre?: string;
    latitude?: number;
    longitude?: number;
    radio?: number;
  }
) {
  return prisma.paraderos.update({
    where: { id },
    data,
  });
}

export async function deleteParadero(id: number) {
  return prisma.paraderos.delete({
    where: { id },
  });
}

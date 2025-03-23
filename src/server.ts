// src/server.ts
import { app } from './app';
import { PORT } from './config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { startSensorPolling } from './sensor.polling'; // <-- Importa tu polling

const httpServer = createServer(app);

// Configurar Socket.IO con CORS
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Ajusta el dominio de tu frontend (ej. http://localhost:4200) si deseas mayor seguridad
  },
});

// Cuando un cliente se conecta:
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Podrías escuchar eventos que mande el cliente
  // socket.on('algúnEvento', (data) => { ... })

  // Cuando un cliente se desconecta:
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Exportamos io para poder usarlo en otras partes del backend
export { io };

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Iniciar el polling al arrancar el servidor
startSensorPolling();

/**
 * httpServer.listen(PORT, () => {
  *console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 */
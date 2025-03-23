// src/sensor.polling.ts
import cron from 'node-cron';
import { getLatestRecord } from './services/sensor.service';
import { io } from './server';

let lastTimestamp: Date | null = null;

/**
 * Inicia un cron job que revisa la tabla sensor_data_4g cada X segundos,
 * y emite un evento socket.io si hay un nuevo registro.
 */
export function startSensorPolling() {
  // Programa el cron para que corra cada 5 segundos (por ejemplo)
  cron.schedule('*/5 * * * * *', async () => {
    try {
      const latest = await getLatestRecord();
      if (!latest || !latest.timestamp)  {
        // No hay registros en la tabla
        return;
      }

      // Comparamos la fecha del último registro con nuestra "última conocida"
      if (!lastTimestamp || latest.timestamp > lastTimestamp) {
        // Tenemos un nuevo registro
        lastTimestamp = latest.timestamp;

        // Emitimos el evento a todos los clientes conectados
        io.emit('new-sensor-data', latest);
      }
    } catch (error) {
      console.error('Error en sensor polling:', error);
    }
  });

  console.log('Polling de sensor_data_4g iniciado (cada 5s).');
}

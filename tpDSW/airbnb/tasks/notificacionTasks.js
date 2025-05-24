import cron from 'node-cron';

export function iniciarTareaChecks(notificacionService) {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Ejecutando tarea diaria de notificaciones');

    await notificacionService.enviarNotificacionCheck();    // Para check-in
    await notificacionService.enviarNotificacionCheckout(); // Para check-out
  });
}
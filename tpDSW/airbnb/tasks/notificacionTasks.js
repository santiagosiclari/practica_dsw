import cron from 'node-cron';

export function iniciarTareaChecks(notificacionService) {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Ejecutando tarea diaria de notificación');
    await notificacionService.enviarNotificacionCheck();
  });
}

import { Queue, Worker, Job } from 'bullmq';
import { redisOptions } from '../config/redis.config';
import nodemailer from 'nodemailer';

export interface OrderJobData {
  orderId: string;
  userEmail: string;
  userName: string;
  totalPrice: number;
  products: { id: string; name: string; price: number }[];
}

export const orderQueue = new Queue('orderQueue', {
  connection: redisOptions as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

export async function dispatchOrderProcessingJob(data: OrderJobData): Promise<void> {
  try {
    await orderQueue.add('processOrderConfirmation', data);
    console.log(`📥 [BullMQ] Tarea de orden #${data.orderId} encolada exitosamente`);
  } catch (err: any) {
    console.warn('⚠️ [BullMQ] Fallback local para orden:', err.message);
    await processOrderNotification(data).catch(() => {});
  }
}

export async function processOrderNotification(data: OrderJobData): Promise<void> {
  console.log(`📧 [Worker] Procesando factura y confirmación de compra para: ${data.userEmail} (Total: $${data.totalPrice})`);
  
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const itemsHtml = data.products
        .map((p) => `<li>${p.name} - $${p.price}</li>`)
        .join('');

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'E-Commerce Store <no-reply@ecommerce.com>',
        to: data.userEmail,
        subject: `Confirmación de Compra - Orden #${data.orderId.substring(0, 8)}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>¡Gracias por tu compra, ${data.userName}!</h2>
            <p>Tu orden ha sido confirmada con éxito.</p>
            <h3>Detalle de productos:</h3>
            <ul>${itemsHtml}</ul>
            <p><strong>Total abonado: $${data.totalPrice}</strong></p>
          </div>
        `,
      });
    } catch (e: any) {
      console.warn('Aviso en envío de email:', e.message);
    }
  }
}

export function startOrderWorker() {
  try {
    const worker = new Worker(
      'orderQueue',
      async (job: Job<OrderJobData>) => {
        await processOrderNotification(job.data);
      },
      {
        connection: redisOptions as any,
        concurrency: 5,
      }
    );

    worker.on('completed', (job) => {
      console.log(`✅ [Worker] Orden procesada con éxito: ${job.id}`);
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ [Worker] Falló la orden ${job?.id}:`, err.message);
    });

    console.log('🚀 [BullMQ] Worker de Órdenes iniciado correctamente');
    return worker;
  } catch (err: any) {
    console.warn('⚠️ No se pudo iniciar el Worker de BullMQ:', err.message);
    return null;
  }
}

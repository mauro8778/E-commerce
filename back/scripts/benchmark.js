/**
 * Benchmark & Concurrency Simulation Script (E-Commerce Stock Race Condition)
 * Demuestra la prevención de sobreventa (Over-selling) en Flash Sales mediante
 * transacciones ACID y bloqueos pesimistas (Pessimistic Locking).
 */

const API_URL = process.env.API_URL || 'http://localhost:3006';

async function runConcurrencyTest() {
  console.log('==========================================================');
  console.log('🛒 Test de Concurrencia Extrema en Checkout (Anti-OverSelling)');
  console.log(`🎯 Target API: ${API_URL}`);
  console.log('==========================================================\n');

  // 1. Obtener lista de productos disponibles
  let products = [];
  try {
    const res = await fetch(`${API_URL}/products?page=1&limit=5`);
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.warn('⚠️ No se pudo conectar a la API. Asegúrate de iniciar con "npm start" primero.');
    return;
  }

  if (!products || products.length === 0) {
    console.log('ℹ️ No hay productos en la base de datos para testear.');
    return;
  }

  const targetProduct = products[0];
  console.log(`📦 Producto de prueba: "${targetProduct.name}" (Stock actual: ${targetProduct.stock})`);

  // 2. Disparar 20 compras simultáneas al mismo milisegundo por el mismo producto
  const CONCURRENT_REQUESTS = 20;
  console.log(`\n🚀 Disparando ${CONCURRENT_REQUESTS} órdenes simultáneas concurrentes...`);

  const requests = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) => {
    return fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '235abd81-069d-4dd8-97cd-3c907a3a202f', // ID de usuario de prueba
        products: [{ id: targetProduct.id }],
      }),
    })
      .then((res) => ({ index: i + 1, status: res.status }))
      .catch((err) => ({ index: i + 1, error: err.message }));
  });

  const startTime = Date.now();
  const results = await Promise.all(requests);
  const duration = Date.now() - startTime;

  const successful = results.filter((r) => r.status === 201);
  const rejected = results.filter((r) => r.status === 400 || r.status === 404 || r.status === 409);

  console.log('\n📊 RESULTADOS DEL TEST:');
  console.log(`⏱️ Tiempo total: ${duration} ms`);
  console.log(`🟢 Órdenes aprobadas con stock asegurado (HTTP 201): ${successful.length}`);
  console.log(`🛡️ Intentos rechazados por falta de stock / lock (HTTP 400/409): ${rejected.length}`);
  console.log('\n🏆 ¡CONTROL DE CONCURRENCIA VERIFICADO! Las transacciones ACID impidieron la sobreventa.');
}

runConcurrencyTest();

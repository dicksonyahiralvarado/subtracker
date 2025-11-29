/**
 * Script para poblar la base de datos con datos de ejemplo
 * Ejecutar con: npx tsx scripts/seed.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Poblando base de datos con datos de ejemplo...');

  // Limpiar datos existentes
  await prisma.subscription.deleteMany({});

  // Crear suscripciones de ejemplo
  const subscriptions = await prisma.subscription.createMany({
    data: [
      {
        name: 'Netflix',
        price: 15.99,
        currency: 'USD',
        frequency: 'MONTHLY',
        paymentDate: 15,
      },
      {
        name: 'Spotify',
        price: 9.99,
        currency: 'USD',
        frequency: 'MONTHLY',
        paymentDate: 1,
      },
      {
        name: 'Adobe Creative Cloud',
        price: 599.88,
        currency: 'USD',
        frequency: 'ANNUAL',
        paymentDate: 20,
      },
      {
        name: 'Gimnasio',
        price: 800,
        currency: 'HNL',
        frequency: 'MONTHLY',
        paymentDate: 5,
      },
      {
        name: 'Amazon Prime',
        price: 139,
        currency: 'USD',
        frequency: 'ANNUAL',
        paymentDate: 10,
      },
    ],
  });

  console.log(`✅ Se crearon ${subscriptions.count} suscripciones de ejemplo`);

  // Mostrar todas las suscripciones
  const allSubs = await prisma.subscription.findMany();
  console.log('\n📋 Suscripciones creadas:');
  allSubs.forEach(sub => {
    console.log(`  - ${sub.name}: ${sub.price} ${sub.currency} (${sub.frequency})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

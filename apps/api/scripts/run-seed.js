const { NestFactory } = require('@nestjs/core');
const path = require('path');

async function bootstrap() {
  console.log('🌱 Iniciando seed...');

  try {
    // Importar el módulo compilado
    const { SeedModule } = require('../dist/src/seeds/seed.module');
    const { SeedService } = require('../dist/src/seeds/seed.service');

    // Crear la aplicación NestJS
    const app = await NestFactory.createApplicationContext(SeedModule, {
      logger: ['error', 'warn', 'log'],
    });

    // Obtener el servicio de seed
    const seedService = app.get(SeedService);

    // Ejecutar el seed
    await seedService.run();

    // Cerrar la aplicación
    await app.close();

    console.log('✅ Seed completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    process.exit(1);
  }
}

bootstrap();

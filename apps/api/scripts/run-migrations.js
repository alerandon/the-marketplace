const { DataSource } = require('typeorm');
const path = require('path');

// Importar la configuración de DataSource compilada
const dataSourcePath = path.join(__dirname, 'dist', 'src', 'config', 'data-source.js');
const { default: AppDataSource } = require(dataSourcePath);

async function runMigrations() {
  console.log('🔄 Iniciando migraciones...');

  try {
    // Inicializar la conexión
    await AppDataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');

    // Ejecutar migraciones pendientes
    const migrations = await AppDataSource.runMigrations();

    if (migrations.length === 0) {
      console.log('✅ No hay migraciones pendientes');
    } else {
      console.log(`✅ Ejecutadas ${migrations.length} migraciones:`);
      migrations.forEach(migration => {
        console.log(`   - ${migration.name}`);
      });
    }

    // Cerrar la conexión
    await AppDataSource.destroy();
    console.log('✅ Migraciones completadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    process.exit(1);
  }
}

runMigrations();

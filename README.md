# The Marketplace

Monorepo de aplicación web para marketplace construido con NestJS, Next.js y PostgreSQL.

## 📋 Requisitos Técnicos

- **Node.js**: v20 o superior
- **npm**: v10.9.0 o superior
- **Docker**: v20.10 o superior
- **Docker Compose**: v2.0 o superior

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del monorepo con las siguientes variables:

```env
# API Configuration
API_PORT=3030
API_NODE_ENV=development

# Database Configuration
API_DB_HOST=postgres
API_DB_PORT=5432
API_DB_DATABASE=the_marketplace_db
API_DB_USERNAME=postgres
API_DB_PASSWORD=password

# JWT Configuration
API_JWT_SECRET=your-secret-key-here

# Web URL to use from /api
WEB_URL=http://localhost:3000

# Next.js API URL
NEXT_PUBLIC_API_URL=http://localhost:3030

```

> **Nota:** Asegúrate de cambiar los valores por defecto, especialmente `API_JWT_SECRET`, antes de desplegar en producción.

## 🚀 Instalación y Ejecución Local con Docker

### Opción 1: Construcción y Ejecución por Separado

```bash
# Construir las imágenes
docker compose build

# Iniciar los contenedores con hot-reload
docker compose up --watch
```

### Opción 2: Construcción y Ejecución Simultánea

```bash
# Construir e iniciar en un solo comando
docker compose up --build --watch
```

El flag `--watch` habilita la recarga automática al detectar cambios en el código fuente.

## 📊 Base de Datos

### Ejecutar Migraciones

Las migraciones deben ejecutarse mientras el proyecto está corriendo en Docker:

```bash
docker compose exec api npm run migration:run
```

### Ejecutar Seeds

Para poblar la base de datos con datos iniciales:

```bash
docker compose exec api npm run seed
```

> **Importante:** Las migraciones y seeds deben ejecutarse después de que los contenedores estén completamente iniciados.

## 🌐 URLs de Acceso

### Desarrollo Local

- **Web Application**: [http://localhost:3000](http://localhost:3000)
- **API REST**: [http://localhost:3030](http://localhost:3030)
- **API Documentation (Swagger)**: [http://localhost:3030/api/docs](http://localhost:3030/api/docs)

### Producción (Deploy)

- **Web Application**: [https://the-marketplace-web.onrender.com/](https://the-marketplace-web.onrender.com/)
- **API Documentation (Swagger)**: [https://the-marketplace-api.onrender.com/api/docs](https://the-marketplace-api.onrender.com/api/docs)

## 📦 Estructura del Proyecto

```
the-marketplace/
├── apps/
│   ├── api/          # Backend NestJS
│   └── web/          # Frontend Next.js
├── packages/
│   └── shared/       # Código compartido
├── docker-compose.yml
└── .env              # Variables de entorno (crear manualmente)
```

## 🛠️ Tecnologías Utilizadas

- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: Next.js, React, TailwindCSS
- **Infraestructura**: Docker, Docker Compose
- **Base de Datos**: PostgreSQL 15

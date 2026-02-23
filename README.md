# paideia-template-nest-rest

Template base para microservicios REST con NestJS y PostgreSQL.

## Stack

- **NestJS** — framework Node.js
- **TypeORM** — ORM para PostgreSQL
- **Docker** — contenedorización

## Desarrollo local

**1. Levantar la base de datos:**
```bash
docker compose -f docker-compose.local.yml up -d
```

**2. Configurar variables de entorno:**
```bash
cp .env.example .env
```

**3. Instalar dependencias y ejecutar:**
```bash
npm install
npm run start:dev
```

La app estará disponible en `http://localhost:3000/paideia-template-nest-rest`.

## Simular producción

Construye y ejecuta todo el stack con Docker:
```bash
docker compose up -d --build
```

## Usar imagen publicada

```bash
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=local \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_NAME=db_paideia_template_nest_rest \
  ghcr.io/paideia-code/paideia-template-nest-rest:main
```

> Requiere PostgreSQL 16+ accesible desde el contenedor.

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Ambiente (`local`, `production`) | `local` |
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USERNAME` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | — |
| `DB_NAME` | Nombre de la base de datos | `db_paideia_template_nest_rest` |


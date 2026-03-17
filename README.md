# paideia-template-nest-rest

Template base para microservicios REST con NestJS y PostgreSQL.

## Stack

- NestJS
- TypeORM
- PostgreSQL
- Docker / Docker Compose

## Modos de ejecución

Este template tiene tres modos de compose. La diferencia principal es de dónde sale la imagen de la app.

| Modo             | Archivo                        | Script npm                  | Qué hace                                                                     |
| ---------------- | ------------------------------ | --------------------------- | ---------------------------------------------------------------------------- |
| Local            | `docker-compose.local.yml`     | `npm run compose:local`     | Levanta solo la base de datos. La app corre fuera de Docker con hot reload.  |
| Build local      | `docker-compose.yml`           | `npm run compose:build`     | Construye la imagen desde el código local (`Dockerfile`) y levanta app + DB. |
| Imagen publicada | `docker-compose.published.yml` | `npm run compose:published` | Descarga imagen desde GHCR y levanta app + DB sin build local.               |

## Prerrequisitos

- Node.js 20+
- npm
- Docker Desktop (o Docker Engine + Compose)

## Variables de entorno

Docker Compose reemplaza `${VAR}` usando este orden:

1. Variables exportadas en tu terminal
2. Archivo `.env` en la raiz del proyecto

Para desarrollo local, crea tu `.env` desde el ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell, si no tienes `cp`, puedes usar:

```powershell
Copy-Item .env.example .env
```

Variables esperadas:

| Variable         | Descripción                      | Default                         |
| ---------------- | -------------------------------- | ------------------------------- |
| `PORT`           | Puerto HTTP de la app            | `3000`                          |
| `NODE_ENV`       | Ambiente (`local`, `production`) | `local`                         |
| `DB_HOST`        | Host de PostgreSQL               | `localhost`                     |
| `DB_PORT`        | Puerto de PostgreSQL             | `5432`                          |
| `DB_USERNAME`    | Usuario de PostgreSQL            | `postgres`                      |
| `DB_PASSWORD`    | Contraseña de PostgreSQL         | vacio                           |
| `DB_NAME`        | Nombre de base de datos          | `db_paideia_template_nest_rest` |
| `DB_SYNCHRONIZE` | Auto-sync de schema TypeORM      | `false`                         |
| `DB_LOGGING`     | Logging SQL de TypeORM           | `true` en local                 |

## Flujo recomendado

### 1) Desarrollo diario (rapido)

```bash
npm install
npm run compose:local
```

Este comando:

- levanta PostgreSQL por compose
- arranca Nest en modo debug/watch (`start:debug`)

El hot reload reinicia la app, pero no recrea el contenedor de la DB.

### 2) Simular produccion con build local

```bash
npm run compose:build
```

Usa `docker compose up -d --build`, por lo que toma cambios de codigo y reconstruye imagen cuando corresponde. Si cambiaste codigo, es normal que demore mas por el rebuild.

### 3) Probar imagen publicada

```bash
npm run compose:published
```

No compila codigo local. Descarga `ghcr.io/paideia-code/paideia-template-nest-rest:main` y levanta el stack.

## Comandos utiles de Docker Compose

```bash
# detener y borrar contenedores/redes del modo default
docker compose down

# detener y borrar para modo local
docker compose -f docker-compose.local.yml down

# ver logs del stack default
docker compose logs -f

# ver logs del modo published
docker compose -f docker-compose.published.yml logs -f
```

## CI/CD en este template

- CI actual: build + push de imagen Docker a GHCR (workflow reusable en infra).
- CD: no esta automatizado en este repo. El despliegue se ejecuta manualmente donde corras compose.

## Nota de seguridad

No subas `.env` reales con secretos al repositorio. Versiona solo `.env.example` y maneja secretos por entorno (variables del servidor o secret manager).

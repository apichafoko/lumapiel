# Editar el sitio con Sanity (Luma Piel)

## Acceso

1. Abrí **https://[tu-dominio]/studio** (o `http://localhost:3000/studio` en desarrollo).
2. Iniciá sesión con el usuario que te invitaron (rol **Editor**).

## Editar una página

1. En el menú izquierdo elegí el tipo de contenido:
   - **Inicio** — página principal
   - **Tratamientos** / **Consultas** — fichas del catálogo
   - **Especialidades** — hubs (`/especialidades/...`)
   - **Equipo** — perfiles doctora / cosmetóloga
   - **Legal** — términos y privacidad
2. Abrí el documento que querés cambiar.
3. Para ver la página real mientras editás: pestaña **Presentation** (vista previa en vivo).
4. Cuando estés conforme: **Publish** (publicar). Los cambios tardan unos segundos en verse en el sitio.

## Qué no conviene tocar sin avisar

- **Slug (URL)** y **ID interno** (`legacyId`): rompen enlaces y el catálogo.
- **Referencias a hubs** (`hubRefs`): deben seguir el formato `hub:id-hub:ancla-seccion`.

## Primera vez (desarrollo)

1. Crear proyecto en [sanity.io/manage](https://www.sanity.io/manage).
2. Copiar variables de [`.env.example`](../.env.example) a `.env.local`.
3. Generar token con permisos **Editor** (lectura) y **Editor** con escritura para migración.
4. Ejecutar: `npm run migrate:content`
5. En Sanity Manage → API → CORS: agregar `http://localhost:3000` y la URL de producción.

## Webhook (producción)

Configurar en Sanity un webhook POST a:

`https://[tu-dominio]/api/revalidate/tag`

- Filtro: `_type in ["service", "hub", "homePage", "person", "legalPage"]`
- Proyección: `{ "tags": [_type] }`
- Secreto: mismo valor que `SANITY_REVALIDATE_SECRET` en Vercel.

# API Backend para Login

Este backend expone el SP `sp_ValidarUsuario` vía API REST para la app móvil.

## Instalación

1. Copia `.env.example` a `.env` y configura tus credenciales de SQL Server.
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Ejecuta el servidor:
   ```sh
   npm start
   ```

## Endpoint

POST `/login`
- Body JSON: `{ "usuario": "...", "password": "..." }`
- Respuesta exitosa: `{ "NombreEmpleado": "..." }`
- Respuesta error: `{ "error": "Datos incorrectos" }`

## Despliegue

Preparado para publicar en Vercel o cualquier plataforma Node.js.

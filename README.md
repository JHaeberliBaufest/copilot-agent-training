# Aplicación Full Stack - Login y Bienvenida

Este repositorio contiene:

- `backend/`: API FastAPI con autenticación JWT.
- `frontend/`: Aplicación React (Vite) con login y pantalla de bienvenida.

## Funcionalidad implementada

- Pantalla de **login** en React.
- Consumo del endpoint backend `POST /token` para autenticación.
- Al iniciar sesión, se guarda el token en `sessionStorage`.
- Pantalla de **bienvenida** protegida:
  - no se puede acceder sin token de sesión;
  - redirige al login cuando no hay sesión.
- Botón de **cerrar sesión** para limpiar el token y volver al login.
- Estilo visual basado en `DESIGN.md` (canvas negro, tarjetas oscuras con hairline, CTA blanco, radios y espaciados definidos).

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+
- Python 3.10+
- Poetry

## Ejecución local

### 1) Backend

```bash
cd /home/runner/work/copilot-agent-training/copilot-agent-training/JHaeberliBaufest/copilot-agent-training/backend
poetry install
poetry run uvicorn main:app --reload
```

Backend disponible en: `http://localhost:8000`

### 2) Frontend

```bash
cd /home/runner/work/copilot-agent-training/copilot-agent-training/JHaeberliBaufest/copilot-agent-training/frontend
npm install
npm run dev
```

Frontend disponible en: `http://localhost:5173`

## Variables de entorno

### Backend

- `SECRET_KEY`: clave para firmar JWT (obligatoria para producción).
- `ALLOWED_ORIGINS`: lista separada por comas para CORS.
  - Valor por defecto:
    - `http://localhost:5173`
    - `http://127.0.0.1:5173`
    - `http://localhost:3000`
    - `http://127.0.0.1:3000`

### Frontend

- `VITE_API_URL` (opcional): URL base de la API.
  - valor por defecto: `http://localhost:8000`

## Credenciales de prueba

- Usuario: `admin`
- Contraseña: `admin123`

## Scripts útiles

### Frontend

```bash
npm run dev
npm run build
npm run lint
```

### Backend

```bash
poetry run pytest
```

## Licencia

MIT

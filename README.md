# Solution: TCIT Fullstack Challenge 2026 🚀

Este repositorio contiene mi solución técnica para el proceso de selección de TCIT. El proyecto ha sido diseñado bajo una arquitectura desacoplada, priorizando la **mantenibilidad**, el **rendimiento en red** y la **claridad de código**.

## Arquitectura y Decisiones de Diseño

### 1. Optimización del Tráfico de Red (Single Fetch Strategy)
Para minimizar la carga en el servidor y mejorar la experiencia de usuario, implementé una estrategia de **fetch único**. La aplicación carga la lista completa de registros al inicio si el estado global está vacío, y utiliza **filtros en el lado del cliente (Redux Selectors)** para las búsquedas. Esto permite una búsqueda instantánea con **latencia cero** para el usuario final.

### 2. Capa de Abstracción en Datos (Sequelize Mapping)
Utilicé **Sequelize** no solo como ORM, sino como una capa de abstracción. He mapeado los campos de la base de datos (originalmente en español) a propiedades en camelCase para el código y la API. Esto garantiza que el frontend interactúe con una API moderna y limpia, independientemente del esquema subyacente de la base de datos.

### 3. Estado Global con Redux Toolkit
Se implementó **Redux Toolkit** para gestionar el estado de los posts y los filtros. El uso de Slices y AsyncThunks simplifica la lógica asíncrona y asegura que la mutación del estado se maneje de forma inmutable mediante Immer.

---

## Puesta en Marcha (Setup)

### Infraestructura (Docker)
Levanta la base de datos PostgreSQL mediante el siguiente comando en la raíz del proyecto:
```bash
docker-compose up -d
```

### Backend (Express)
```bash
cd server
npm install
npm run dev
```

### Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```

---

## Mejoras Respecto a Versiones Anteriores
*   **Blindaje de Despliegue:** Se configuró el entorno para un arranque persistente y resistente a errores de TTY.
*   **Separación de Responsabilidades:** Arquitectura estrictamente dividida entre `client` y `server`.
*   **Seguridad:** Sanitización de consultas SQL nativa mediante el ORM.

*Desarrollado con enfoque en ingeniería por Rodrigo Hernandez.*

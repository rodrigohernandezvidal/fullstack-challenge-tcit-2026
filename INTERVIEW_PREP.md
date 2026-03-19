# 🎤 Guía de Preparación: Entrevista Técnica (Fullstack)

> **Mentalidad:** No eres un Junior que "hizo que funcionara". Eres un Profesional que tomó **decisiones de diseño**.

---

## ⚔️ Preguntas "Trampa" y Cómo Responderlas

### 1. Sobre la Optimización (La pregunta de Oro) 🏆
**Pregunta:** *"El requerimiento pedía llamar a la lista una sola vez. Explícame cómo garantizaste eso technicalmente."*

**Respuesta Ganadora:**
"Claro. Identifiqué que para una lista de Posts (que no son millones), hacer una petición al servidor por cada letra del buscador es ineficiente y satura la red.
Implementé una estrategia de **Client-Side Filtering**:
1.  En `App.jsx`, uso un `useEffect` que solo dispara `fetchPosts` si el estado de Redux está 'idle' (vacío). Si ya tengo datos, no vuelvo a preguntar.
2.  Cuando el usuario escribe en el buscador, **NO** llamo a la API. Simplemente filtro el array que ya tengo en memoria usando un Selector de Redux.
Esto hace que la búsqueda sea instantánea (0 latencia) y ahorra costos de servidor."

### 2. Sobre Redux
**Pregunta:** *"¿Por qué usaste Redux Toolkit y no Context API o Redux clásico?"*

**Respuesta Ganadora:**
"Context API es genial para cosas pequeñas (temas, auth), pero para manejo de datos de negocio con efectos secundarios (llamadas asíncronas), prefiero **Redux**.
Elegí **Toolkit** específicamente porque elimina el código repetitivo del Redux antiguo (switch cases gigantes) y ya trae configurado `redux-thunk` para las llamadas asíncronas (`createAsyncThunk`), lo que deja el código mucho más limpio y fácil de mantener."

### 3. Sobre Docker
**Pregunta:** *"Vi que incluiste un archivo docker-compose. ¿Por qué?"*

**Respuesta Ganadora:**
"Para facilitarles la vida a ustedes (los revisores).
No quería asumir que tenían PostgreSQL instalado o configurado con las mismas credenciales que yo. Con Docker, garantizo que el entorno de Base de Datos sea idéntico al mío y que con un solo comando (`up`) el proyecto esté corriendo. Es una buena práctica de DevOps para reducir el 'works on my machine'."

---

## 🛡️ Preguntas Técnicas "Hardcore" (Por si profundizan)

### A. "¿Qué pasa si la lista de Posts fuera de 1 Millón de registros?"
*   *Respuesta:* "Ahí mi estrategia de 'Client-Side Filtering' fallaría porque el navegador se pegaría. En ese caso, cambiaría a **Server-Side Pagination & Filtering**. Enviaría `page=1&search=texto` al backend y usaría `LIMIT` y `OFFSET` en SQL."

### B. "¿Por qué Sequelize y no SQL directo?"
*   *Respuesta:* "Por seguridad y mantenibilidad. Sequelize sanitiza las queries para prevenir **SQL Injection** y me permite definir modelos claros. Además, si mañana decidimos cambiar de Postgres a MySQL, el cambio es mínimo en el código."

### C. "En el Backend, ¿cómo manejas los errores asíncronos?"
*   *Respuesta:* "Usé bloques `try/catch` en los controladores (Controllers). Si la base de datos falla, capturo el error y respondo con un status 500 y un mensaje JSON claro, en lugar de dejar que el servidor crashee."

---

## 🧪 Tu Truco Final: "El Código Habla"
Si te pones nervioso, ofrece mostrar el código:
*"Si quieren, puedo compartir pantalla y mostrarles específicamente el archivo `postsSlice.js` donde manejo la lógica asíncrona."*
(Esto demuestra confianza y te permite leer tu propio código como guion).

¡Éxito! Tienes el conocimiento y el código para respaldarlo. 🚀

🕵️‍♂️ Guía de Entrevista Técnica: Respuestas de Nivel Experto

He revisado el archivo 
INTERVIEW_PREP.md
 que ya tenías en el proyecto (¡es excelente!) y he preparado un complemento de NIVEL PRO basado específicamente en cómo escribiste el código.

Aquí tienes las 3 preguntas clave que separan a un "Junior" de un "Senior" con este código:

1. Sobre la Arquitectura de Datos (La Pregunta "Sutil") 🧠
Experto: "Noté en tu modelo 
Post.js
 que usas field: 'nombre'. ¿Por qué no llamaste simplemente name a la columna en la base de datos?"

Tu Respuesta Ganadora: "Esa fue una decisión de diseño para desacoplar el Backend del Frontend. A veces las bases de datos tienen convenciones antiguas (como nombre en español o snake_case), pero el estándar moderno en React/JS es camelCase. Al usar el mapping de Sequelize (field: 'nombre'), actúo como una Capa Anticorrupción (ACL): mi código JS siempre interactúa con name (limpio), sin importar qué tan legacy sea la base de datos por debajo. Si mañana cambian el nombre de la columna en la BD, solo toco el modelo, no rompo todo el frontend."

2. Sobre Redux Toolkit y "Mutabilidad" 🔄
Experto: "En tu reducer veo que haces state.items.unshift(action.payload). ¿Eso no está mal? En Redux el estado debe ser inmutable."

Tu Respuesta Ganadora: "En Redux clásico (vanilla) sí sería un error grave. Pero como estoy usando Redux Toolkit, este utiliza la librería Immer por debajo. Immer me permite escribir código que parece mutable (como un push o un unshift) porque es más fácil de leer, pero internamente genera un nuevo estado inmutable de forma segura. Es lo mejor de los dos mundos: legibilidad y seguridad."

3. Sobre la Escalabilidad del Filtro 🚀
Experto: "Tu filtro es local. ¿Qué pasa si la lista crece mucho? ¿Cómo sabrías cuándo cambiar a filtrado en servidor?"

Tu Respuesta Ganadora: "Es un tema de Performance Budget. Ahora mido que cargar 100 o 500 posts pesa pocos KB y es instantáneo. Pero si la métrica de 'Time to Interactive' sube o el payload JSON supera, digamos, los 50KB-100KB, es el momento de refactorizar. Ahí movería el filtro al backend (WHERE name ILIKE...), debouncería el input del usuario para no saturar la API, y paginaría los resultados. No optimizo prematuramente, pero el código está listo para escalar."

Resumen:

Decoupling: Sabes separar capas (BD vs Código).
Tooling: Entiendes tus herramientas (Immer/Toolkit).
Performance: Tienes criterio para decidir cuándo optimizar.
¡Con estas respuestas demuestras que no solo copiaste código, sino que entiendes por qué funciona así! 🚀
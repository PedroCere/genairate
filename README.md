
# 🧠 GenAIrate — Generador Inteligente de Contenido para Blogs

GenAIrate es una plataforma AI-powered para crear artículos de blog completos en español, con estilo personalizable y generación conectada a modelos remotos mediante OpenRouter. Ideal para bloggers, equipos de marketing y proyectos SEO que buscan contenido de calidad asistido por IA.

## 🚀 Características Principales

- ✍ Generación automática de artículos a partir de un tema.
- 🧠 Reescritura inteligente con selección de tono y formato.
- 🪄 Sugerencias en tiempo real (próximamente).
- 📖 Salida en formato JSON estructurado listo para frontend.
- 💾 Historial y plantillas personalizadas (modular, escalable).

## 📦 Stack Tecnológico

| Capa        | Tecnología                              |
|-------------|------------------------------------------|
| Backend     | Java 21 + Spring Boot (arquitectura hexagonal) |
| Frontend    | React + Vite + TailwindCSS               |
| IA remota   | OpenRouter API (modelos gratuitos)       |
| Interfaz API| REST API versionada (`/api/v1/...`)      |

---

## 🛠 Instalación Local

### 🔧 Requisitos

- Java 21 (con Maven)
- Node.js 18+
- Cuenta gratuita en [OpenRouter.ai](https://openrouter.ai)
- Clave API válida (`OPENROUTER_API_KEY`)

### ⚙ Backend Java (Spring Boot)

```bash
cd backend/
./mvnw spring-boot:run

⚙ Frontend React
cd frontend/
npm install
npm run dev


🧪 Cómo Funciona
El usuario define tema, tono, formato.


Spring Boot construye el prompt y llama a OpenRouter API.


OpenRouter responde con el artículo en formato estructurado.


El frontend consume este JSON y lo presenta al usuario.


📤 Ejemplo de entrada
{
  "user_input": "Tendencias de IA en 2025",
  "tone": "profesional",
  "format": "lista",
  "language": "es"
}

🔁 Respuesta esperada
{
  "title": "...",
  "introduction": "...",
  "sections": [
    { "subtitle": "...", "content": "..." }
  ],
  "conclusion": "...",
  "keywords": ["...", "..."],
  "meta_description": "..."
}


🧩 Arquitectura
Backend modular con microservicios.


Arquitectura hexagonal (clean architecture).


Frontend desacoplado con UI tipo editor (Notion/Medium).


Comunicación entre frontend ↔ backend vía REST.


Uso de OpenRouter API como gateway de modelos generativos.



📘 Documentación Interna
BlogContentService: construcción de prompts y llamada a OpenRouter.


TemplateService: gestiona estructuras y formatos de artículos.


UserService: gestiona preferencias, estilos y autenticación.


README.md: este archivo.



🧠 Créditos
Proyecto desarrollado como parte del sistema GenAIrate.


Modelos generativos accesibles vía OpenRouter API.



📄 Licencia
Este proyecto está bajo la licencia MIT. Ver LICENSE para más información.

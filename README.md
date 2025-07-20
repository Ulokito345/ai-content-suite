# 🤖 AI Content Suite

Una aplicación web completa para organizar y analizar contenido de YouTube sobre inteligencia artificial.

## ✨ Características

- 📺 **Gestión de Canales**: Agrega y gestiona tus canales favoritos de IA
- 🎯 **Análisis Inteligente**: Categorización automática de contenido con IA
- 🔧 **Catálogo de Herramientas**: Descubre nuevas herramientas de IA organizadas por categoría
- 📰 **Feed de Noticias**: Resúmenes de noticias importantes del sector
- 🔍 **Búsqueda Avanzada**: Busca en transcripciones de videos
- 📱 **PWA**: Funciona como app nativa en móvil
- 🔔 **Notificaciones**: Alertas de contenido importante
- 🌐 **Multiidioma**: Soporta contenido en español e inglés

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** con TypeScript
- **Tailwind CSS** para estilos
- **Prisma** para base de datos
- **PWA** con Service Workers

### Backend
- **FastAPI** (Python) para procesamiento de YouTube
- **YouTube Transcript API** para extraer transcripciones
- **Mistral AI** para análisis de contenido

### Base de Datos
- **PostgreSQL** en Supabase

### Deployment
- **Vercel** (Frontend)
- **Railway** (Backend)

## 🚀 Instalación Rápida

1. **Clona el repositorio**
```bash
git clone [tu-repo]
cd ai-content-suite
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
cp .env.local.example .env.local
# Edita .env.local con tus credenciales
```

4. **Configura la base de datos**
```bash
npx prisma generate
npx prisma db push
```

5. **Inicia el desarrollo**
```bash
npm run dev
```

## 📖 Guía Completa

Para una configuración completa paso a paso, consulta [SETUP_GUIDE.md](../SETUP_GUIDE.md)

## 🎯 Uso

### Agregar Canales
1. Ve a **Canales**
2. Usa el formulario para agregar URLs de YouTube
3. Los videos se cargan automáticamente

### Procesar Videos
1. Haz clic en **Procesar** en cualquier video
2. La IA analizará el contenido y extraerá:
   - Herramientas mencionadas
   - Noticias importantes
   - Categorización automática
   - Resumen del contenido

### Explorar Contenido
- **Dashboard**: Vista general con estadísticas
- **Herramientas**: Catálogo filtrable de herramientas de IA
- **Canales**: Gestión de canales y videos

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint

# Base de datos
npx prisma studio        # Abrir admin de BD
npx prisma generate      # Generar cliente
npx prisma db push       # Aplicar esquema
```

## 📱 PWA

La aplicación funciona como PWA:
- Se puede instalar en móvil/desktop
- Funciona offline (contenido cacheado)
- Notificaciones push
- Experiencia nativa

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles

## 🆘 Soporte

Si encuentras problemas:
1. Revisa la [guía de configuración](../SETUP_GUIDE.md)
2. Verifica las variables de entorno
3. Consulta los logs de Railway/Vercel

---

Desarrollado con ❤️ para la comunidad de IA en español# Deploy timestamp: Sun Jul 20 20:58:54 CEST 2025

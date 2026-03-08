# 🐍 Curso de Python con MUAR 2.1 + MAR 1.0

## Descripción
Curso de programación en Python diseñado con los principios del **Marco Universal de Aprendizaje Recursivo (MUAR 2.1)** y el sistema de **Multi-Atención Recursiva (MAR 1.0)**.

## Estructura Pedagógica

### Los 3 Estadios (Recursivos)
1. **Estadio 1 - Lineal**: Contacto directo con variables, tipos y operaciones básicas
2. **Estadio 2 - Estructurado**: Listas, diccionarios, funciones y control de flujo
3. **Estadio 3 - Abstracto**: Proyecto integrador con conexiones interdisciplinarias

### Sistema MAR (Multi-Atención Recursiva)
- Interrupciones de ≤15 segundos
- 3 ráfagas por lección máximo
- Puentes de retorno explícitos
- Opcionalidad: el estudiante puede saltar cualquier ráfaga

## 🚀 Publicación

### Opción 1: GitHub Pages (Recomendado)
1. Crear repositorio en GitHub
2. Subir todos los archivos manteniendo la estructura de carpetas
3. Ir a Settings → Pages → Activar GitHub Pages
4. El curso estará disponible en: `https://tu-usuario.github.io/tu-repo/`

### Opción 2: Netlify
1. Crear cuenta en Netlify
2. Arrastrar la carpeta completa al dashboard
3. El curso se publica automáticamente

### Opción 3: Servidor Local
1. Instalar Python
2. En la carpeta del curso: `python -m http.server 8000`
3. Abrir `http://localhost:8000` en el navegador

## 📊 Recolección de Datos

El curso guarda progreso en `localStorage` del navegador. Para exportar:
- Los estudiantes pueden descargar su progreso desde la bitácora
- Los datos incluyen: lecciones completadas, ráfagas activadas, reflexiones

## 🔧 Personalización

### Cambiar contenido de ráfagas MAR
Editar `data/burst-content.json`

### Modificar colores
Editar variables CSS en `css/main.css` (sección `:root`)

### Agregar nuevas lecciones
Copiar la estructura de `estadio1/index.html` y adaptar

## 📝 Principios de Diseño

1. **Igualdad de inteligencias**: No hay estudiantes "más capaces", hay diferentes ritmos
2. **Verificación, no examen**: El estudiante verifica su propio avance
3. **Error como dato**: Los bugs son pistas, no fracasos
4. **Objeto común**: El mismo concepto se explora en los 3 estadios
5. **Opcionalidad**: Las interrupciones MAR pueden saltarse

## 📞 Soporte

Para reportar bugs o sugerir mejoras, abrir un issue en el repositorio.

---

**Licencia**: Creative Commons BY-SA 4.0
**Autor**: Curso desarrollado con principios MUAR 2.1 + MAR 1.0
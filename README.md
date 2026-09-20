# 🎨 ComView — v2.0

> **Tablero Kanban minimalista, orgánico y humano de comisiones para artistas.**

ComView es una aplicación web ligera diseñada específicamente para artistas digitales y creadores de contenido. Permite gestionar el flujo de trabajo de encargos (comisiones) desde el boceto inicial hasta la entrega final, priorizando una experiencia de usuario cálida, rápida, táctil y sin fricciones.

![Estado](https://img.shields.io/badge/Estado-v2.0-success)
![React](https://img.shields.io/badge/React-Vite-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4)

---

## 📑 Tabla de Contenidos

- [Novedades de la v2.0](#-novedades-de-la-v20)
- [Características Principales](#-características-principales)
- [Filosofía de Diseño UI/UX](#-filosofía-de-diseño-uiux)
- [Arquitectura y Código](#️-arquitectura-y-código)
- [Guía de Instalación](#-guía-de-instalación)
- [Registro de Aprendizaje](#-registro-de-aprendizaje)

---

## 🚀 Novedades de la v2.0

- 🧩 **Tablero Kanban Interactivo** — Sistema de Drag & Drop fluido para mover los encargos entre las fases de `Boceto`, `Lineart`, `Color` y `Terminado`.
- 🔍 **Vista de Detalle Expandida** — Modal interactivo con efecto `backdrop-blur` para visualizar descripciones largas, fechas de entrega y valores totales sin abandonar el tablero.
- 💾 **Respaldo de Datos Seguro** — Función de exportación a `.json` en un solo clic para asegurar el trabajo frente a borrados de caché.
- 🏢 **Arquitectura de Nivel Empresarial** — Implementación de Context API para el estado global y una Capa de Servicios dedicada para la gestión del `LocalStorage`.
- 🌿 **Diseño Orgánico (Anti-IA)** — Paleta "Jardín de Lavanda" con componentes visuales que huyen del minimalismo rígido, priorizando bordes suaves y sombras cálidas.

---

## ✨ Características Principales

- 📝 **Gestión de Encargos** — Crea nuevas tarjetas de comisión con detalles vitales: cliente, precio, fecha de entrega y descripción.
- 🔄 **Flujo de Estados** — Avanza cada encargo a través de sus fases artísticas mediante drag & drop en un tablero Kanban: `Boceto` ➔ `Lineart` ➔ `Color` ➔ `Terminado`.
- 🗃️ **Archivado Lógico** — Oculta los encargos terminados del tablero principal enviándolos a un historial seguro, con la capacidad de restaurarlos en cualquier momento.
- 💾 **Persistencia Local** — Los datos nunca se pierden al recargar. Todo se guarda de forma segura y automática en el `LocalStorage` del navegador, con respaldo exportable a `.json`.

---

## 🎨 Filosofía de Diseño UI/UX

Este proyecto aplica estrictamente una **Directriz de Diseño Anti-IA Genérica**.

El diseño visual huye de las plantillas robóticas y los estilos prefabricados sin alma. La interfaz se siente intencionada, orgánica y con personalidad, pensada específicamente para el confort visual del artista.

| Elemento | Detalle |
|---|---|
| **Paleta "Jardín de Lavanda"** | Blancos crema (`#FDFBF7`), acentos en verde salvia (`#8BA888`) y botones cómodos en morado malva (`#7A5C76`) |
| **Tipografía Dual** | `Merriweather` (Serif) para personalidad humana en los títulos + `Inter` (Sans-Serif) para claridad en los datos técnicos |
| **Detalles Orgánicos** | Sombras cálidas, bordes suavizados y decoraciones SVG sutiles integradas en el entorno |

---

## 🏗️ Arquitectura y Código

El desarrollo de ComView se rige por un estándar estricto de calidad:

1. **Modularidad Absoluta** — Separación estricta entre contenedores lógicos (`App.jsx`), navegación (`Header.jsx`) e interfaces (`ComissionCard.jsx`, `CommissionForm.jsx`).
2. **Estado Global con Context API** — El estado de las comisiones se consume desde un contexto global, evitando el *prop drilling* y manteniendo la modularidad absoluta.
3. **Capa de Servicios** — La persistencia (`LocalStorage`) y la exportación de archivos viven en una capa de servicios independiente de la interfaz, aislando la vista de futuros cambios de base de datos.
4. **Cero Pérdida de Funcionalidad (No-Regression)** — Cada refactorización garantiza la persistencia del 100% de las integraciones previas (ej. el borrado lógico en lugar de destructivo).
5. **Convención `snake_case`** — Toda la lógica, estados y propiedades personalizadas utilizan guiones bajos (ej. `mostrar_formulario`, `fase_actual`) para mantener máxima claridad estructural.

---

## 🚀 Guía de Instalación

Para correr ComView localmente en tu máquina, sigue estos pasos:

**1. Clonar el repositorio**

```bash
git clone https://github.com/TU_USUARIO/comview.git
cd comview
```

**2. Instalar las dependencias**

```bash
npm install
```

**3. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

**4. Abrir en el navegador**

Visita [`http://localhost:5173`](http://localhost:5173) para ver la aplicación corriendo.

---

## 🧠 Registro de Aprendizaje

### v2.0

- **Gestión de Estado Global (Context API)** — Consumir datos desde un contexto global evita tener que pasar propiedades en cadena (*prop drilling*), manteniendo una Modularidad Absoluta.
- **Servicios Independientes** — Extraer la persistencia de datos y exportación de archivos a una Capa de Servicios protege la interfaz visual de futuros cambios de base de datos, garantizando la regla de cero pérdida (No-Regression).
- **Físicas de Drag & Drop** — El uso de *Sensors* en librerías de arrastre es obligatorio para diferenciar entre un "clic" en un botón interno y la intención de "arrastrar" todo el componente.
- **Aislamiento de Eventos** — El uso de `e.stopPropagation()` permite anidar elementos clickeables (botones dentro de tarjetas clickeables) sin que los eventos choquen entre sí, manteniendo componentes altamente interactivos.

### v1.0

- **Tailwind v4** — La nueva versión requiere configurar las variables de diseño (`@theme`) directamente en el CSS nativo, eliminando el antiguo `tailwind.config.js`.
- **Persistencia Simple** — Para que un MVP sea verdaderamente utilizable por el usuario final, integrar `LocalStorage` mediante `useEffect` es la solución más limpia antes de escalar a bases de datos.
- **Refactorización Segura** — Reutilizar componentes (como el Header) para que actúen como controladores de estado (`vista_actual`) permite añadir pestañas (Activas/Historial) sin sobrecargar la interfaz.

---

<p align="center">Diseñado y desarrollado con dedicación para la comunidad artística, respetando la directriz de código limpio y modularidad absoluta. 🌿</p>
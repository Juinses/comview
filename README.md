# 🌿 ComView

> **Gestor minimalista, orgánico y humano de comisiones para artistas.**

ComView es una aplicación web ligera diseñada específicamente para artistas digitales y creadores de contenido. Permite gestionar el flujo de trabajo de encargos (comisiones) desde el boceto inicial hasta la entrega final, priorizando una experiencia de usuario cálida, rápida y sin fricciones.

![Estado](https://img.shields.io/badge/Estado-MVP_Estable-success)
![React](https://img.shields.io/badge/React-Vite-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4)

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Filosofía de Diseño UI/UX](#-filosofía-de-diseño-uiux)
- [Arquitectura y Código](#️-arquitectura-y-código)
- [Guía de Instalación](#-guía-de-instalación)
- [Registro de Aprendizaje](#-registro-de-aprendizaje)

---

## ✨ Características Principales

- 📝 **Gestión de Encargos** — Crea nuevas tarjetas de comisión con detalles vitales: cliente, precio, fecha de entrega y descripción.
- 🔄 **Flujo de Estados** — Avanza intuitivamente cada encargo a través de sus fases artísticas: `Boceto` ➔ `Lineart` ➔ `Color` ➔ `Terminado`.
- 🗃️ **Archivado Lógico** — Oculta los encargos terminados del tablero principal enviándolos a un historial seguro, con la capacidad de restaurarlos en cualquier momento.
- 💾 **Persistencia Local** — Los datos nunca se pierden al recargar. Todo se guarda de forma segura y automática en el `LocalStorage` del navegador.

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
2. **Cero Pérdida de Funcionalidad (No-Regression)** — Cada refactorización garantiza la persistencia del 100% de las integraciones previas (ej. el borrado lógico en lugar de destructivo).
3. **Convención `snake_case`** — Toda la lógica, estados y propiedades personalizadas utilizan guiones bajos (ej. `mostrar_formulario`, `fase_actual`) para mantener máxima claridad estructural.

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

Durante el desarrollo de este MVP, se documentaron los siguientes aprendizajes técnicos:

- **Tailwind v4** — La nueva versión requiere configurar las variables de diseño (`@theme`) directamente en el CSS nativo, eliminando el antiguo `tailwind.config.js`.
- **Persistencia Simple** — Para que un MVP sea verdaderamente utilizable por el usuario final, integrar `LocalStorage` mediante `useEffect` es la solución más limpia antes de escalar a bases de datos.
- **Refactorización Segura** — Reutilizar componentes (como el Header) para que actúen como controladores de estado (`vista_actual`) permite añadir pestañas (Activas/Historial) sin sobrecargar la interfaz.

---

<p align="center">Diseñado y desarrollado con dedicación para la comunidad artística. 🌿</p>
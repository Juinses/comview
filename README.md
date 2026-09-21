# 🌿 ComView — v3.0 (Cloud Edition)

> **Tablero Kanban minimalista, orgánico y humano de comisiones para artistas. Ahora en la nube.**

ComView es una aplicación web ligera diseñada específicamente para artistas digitales y creadores de contenido. Permite gestionar el flujo de trabajo de encargos (comisiones) desde el boceto inicial hasta la entrega final, priorizando una experiencia de usuario cálida, rápida, táctil y sin fricciones. En su versión 3.0, ComView da el salto de una herramienta local a una plataforma completamente en la nube: cuentas de usuario, persistencia asíncrona en PostgreSQL y acceso desde cualquier dispositivo.

![Estado](https://img.shields.io/badge/Estado-Producción-success)
![React](https://img.shields.io/badge/React-Vite-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)
![Vercel](https://img.shields.io/badge/Hosting-Vercel-black)

---

## 📑 Tabla de Contenidos

- [Novedades de la v3.0](#-novedades-de-la-v30-cloud-edition)
- [Novedades de la v2.0](#-novedades-de-la-v20)
- [Características Principales](#-características-principales)
- [Filosofía de Diseño UI/UX](#-filosofía-de-diseño-uiux)
- [Arquitectura y Código](#️-arquitectura-y-código)
- [Guía de Instalación](#-guía-de-instalación)
- [Registro de Aprendizaje](#-registro-de-aprendizaje)
- [Notas de Depuración — Storage & Portals (v3.0)](#-notas-de-depuración--storage--portals-v30)

---

## ☁️ Novedades de la v3.0 (Cloud Edition)

- ☁️ **Persistencia en la Nube** — Migración completa de `LocalStorage` a Supabase (PostgreSQL), con Row Level Security para que cada artista solo vea sus propios encargos.
- 🔐 **Autenticación de Usuarios** — Registro e inicio de sesión con Supabase Auth, sin fricción de confirmación de correo obligatoria.
- 👤 **Gestión de Perfil** — Modal dedicado para actualizar el nombre/alias y el avatar del artista, con subida de imágenes a Supabase Storage.
- 🖱️ **Actualizaciones Optimistas** — El tablero Kanban sigue respondiendo al instante en el drag & drop, mientras las escrituras a la base de datos ocurren en segundo plano.
- 🧩 **Arquitectura de Auth Consolidada** — `usuario` y `cargando` se manejan desde el mismo contexto global de encargos, simplificando el árbol de proveedores.

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
- ☁️ **Persistencia en la Nube** — Los datos se guardan en Supabase (PostgreSQL) en tiempo real, protegidos por Row Level Security por usuario, con respaldo exportable a `.json`.
- 👤 **Perfil de Artista** — Nombre/alias y avatar editables desde un modal dedicado, sincronizados con Supabase Auth y Storage.

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
2. **Estado Global con Context API** — El estado de las comisiones (y, desde v3.0, del usuario autenticado) se consume desde un contexto global, evitando el *prop drilling* y manteniendo la modularidad absoluta.
3. **Capa de Servicios** — La persistencia y autenticación viven en una capa de servicios independiente de la interfaz (`servicios/almacenamiento.js`, `servicios/autenticacion.js`, `servicios/supabase_cliente.js`), aislando la vista de futuros cambios de base de datos.
4. **Cero Pérdida de Funcionalidad (No-Regression)** — Cada refactorización garantiza la persistencia del 100% de las integraciones previas (ej. el borrado lógico en lugar de destructivo).
5. **Convención `snake_case`** — Toda la lógica, estados, funciones y tablas de base de datos utilizan guiones bajos (ej. `mostrar_formulario`, `fase_actual`, `cliente_supabase`) para mantener máxima claridad estructural.

### Módulos de Perfil y Autenticación (v3.0)

| Archivo | Responsabilidad |
|---|---|
| `src/servicios/supabase_cliente.js` | Cliente de Supabase, lee credenciales de `.env.local` |
| `src/servicios/autenticacion.js` | `registrar_usuario`, `iniciar_sesion`, `cerrar_sesion`, `obtener_usuario_actual`, `actualizar_perfil`, `subir_avatar` |
| `src/contexto/encargos_context.jsx` | Estado global: `usuario`, `cargando`, `encargos` y sus operaciones (incluye `refrescar_usuario`) |
| `src/components/MenuPerfil.jsx` | Botón "Perfil" en el Header — abre el modal de edición directamente |
| `src/components/Auth/ModalEditarPerfil.jsx` | Formulario de edición de nombre/alias y avatar |

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

**3. Variables de entorno (`.env.local`)**

Crea este archivo en la raíz con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_llave_publica_aqui
```

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

**5. Abrir en el navegador**

Visita [`http://localhost:5173`](http://localhost:5173) para ver la aplicación corriendo.

---

## 🧠 Registro de Aprendizaje

### v3.0

- **Portales para Overlays (`createPortal`)** — Cualquier modal con `position: fixed` que viva dentro de un componente con `backdrop-blur`, `filter` o `transform` en algún ancestro deja de posicionarse respecto al viewport. `createPortal(..., document.body)` lo saca de esa jerarquía y soluciona el problema de raíz.
- **RLS de Storage son 4 políticas independientes** — `select`, `insert`, `update` y `delete` sobre `storage.objects` se configuran por separado. Marcar un bucket como "Public" solo habilita lectura anónima; escribir archivos siempre requiere sus propias políticas.
- **Sensibilidad a mayúsculas en nombres de bucket** — Supabase distingue `avatars` de `Avatares` como recursos completamente distintos; el nombre en el código debe coincidir exactamente con el creado en el dashboard.
- **Simplicidad ante bugs de UI difíciles de rastrear** — Un dropdown que dejó de responder a clics sin errores visibles se resolvió eliminándolo: menos capas de estado (menú + modal) significa menos superficie para bugs silenciosos.

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

## 🐛 Notas de Depuración — Storage & Portals (v3.0)

Detalle técnico completo de los tres bugs encadenados durante la implementación de "Editar Perfil", por si el equipo necesita recrear el entorno o depurar algo similar:

1. **`Bucket not found`** → el bucket se llamaba `Avatares` (mayúscula), el código apuntaba a `avatars`.
2. **`new row violates row-level security policy`** → el bucket público tenía 0 políticas RLS; insertar/actualizar/borrar siempre pasa por RLS aunque el bucket sea público.
3. **`Object not found` (404) al mostrar el avatar** → la política de `select` había quedado con `bucket_id = 'avatars'` (minúscula) de un intento anterior.

**Políticas RLS finales** (bucket `Avatares`, carpeta por usuario `{user_id}/avatar.ext`):

```sql
create policy "Avatares son públicos para lectura"
  on storage.objects for select
  using (bucket_id = 'Avatares');

create policy "Los usuarios suben solo a su carpeta"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'Avatares' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Los usuarios actualizan solo su avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'Avatares' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Los usuarios borran solo su avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'Avatares' and (storage.foldername(name))[1] = auth.uid()::text);
```

Diagnóstico útil para verificar el estado real de las políticas en cualquier momento:

```sql
select policyname, cmd, roles, qual, with_check
from pg_policies
where tablename = 'objects' and schemaname = 'storage';
```

---

<p align="center">Diseñado y desarrollado con dedicación para la comunidad artística, respetando la directriz de código limpio y modularidad absoluta. 🌿</p>
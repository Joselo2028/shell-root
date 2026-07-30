# 🚀 Shell Root - Plataforma Frontend SPA

## Descripción

Este repositorio corresponde al **Shell Principal (Host Application)** de la plataforma frontend de La Tinka.

El Shell es responsable de la composición y orquestación de los Microfrontends que conforman la solución, gestionando la navegación principal, la carga dinámica de aplicaciones remotas y la integración entre dominios funcionales y componentes transversales.

La plataforma se encuentra implementada mediante una arquitectura basada en **Angular**, **Webpack Module Federation** y un esquema **MultiRepositorio**, permitiendo el desarrollo y despliegue independiente de cada Microfrontend.

---

# 🏗️ Arquitectura de la Solución

La solución SPA está compuesta por un Shell Principal y un conjunto de Microfrontends especializados.

## Shell Principal

Responsabilidades:

- Navegación global.
- Composición de Microfrontends.
- Gestión de sesión.
- Resolución de remotos.
- Integración transversal.
- Consumo de APIs.
- Orquestación de la experiencia de usuario.

---

## Microfrontends Transversales

Componentes reutilizables consumidos por múltiples dominios de negocio:

- Auth
- User
- Wallet
- Recharges
- Notifications
- Support

---

## Microfrontends de Negocio

Dominios funcionales independientes:

- Landing
- Tinka
- Kábala
- GanaDiario
- GanaGol
- Kinelo
- VideoLoterías

---

# ⚙️ Stack Tecnológico

| Tecnología        | Versión                            |
| ----------------- | ---------------------------------- |
| Angular           | 21.2.x                             |
| Angular CLI       | 21.2.x                             |
| Node.js           | 20.19.0                            |
| npm               | 10.8.2                             |
| Module Federation | 21.2.2                             |
| TypeScript        | Incluido en Angular 21             |
| TanStack Query    | Gestión de caché y estado servidor |

---

# 🔗 Comunicación e Integración

La comunicación entre Microfrontends se realiza mediante:

- Custom Events
- Contratos de Integración

La persistencia compartida contempla:

- Local Storage
- Cookies

Para la gestión de información proveniente del backend se contempla el uso de **TanStack Query**, permitiendo:

- Gestión de estado servidor.
- Caché de consultas.
- Reutilización de datos.
- Optimización de llamadas a APIs.
- Sincronización automática de información.

---

# 📡 Consumo de APIs

La solución contempla:

- API Gateway
- APIs de Dominio
- APIs Transversales

Cada Microfrontend consume únicamente las capacidades necesarias de acuerdo con su responsabilidad funcional.

---

# 🌎 Configuración de Entornos

La plataforma utiliza dos mecanismos de configuración.

## Configuración de Remotos

El Shell administra las URLs de los Microfrontends mediante los archivos:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Ejemplo:

```typescript
remotes: {
  auth: 'http://localhost:4202/remoteEntry.js',
  user: 'http://localhost:4203/remoteEntry.js',
  wallet: 'http://localhost:4204/remoteEntry.js',
  recharges: 'http://localhost:4205/remoteEntry.js'
}
```

Durante la ejecución, el Shell resuelve estas configuraciones para cargar dinámicamente los Microfrontends remotos mediante Module Federation.

---

## Configuración de Public Path

Cada Microfrontend define su propio archivo `.env`.

Ejemplo:

```env
PUBLIC_PATH=http://localhost:4202/
```

Este valor es utilizado por Webpack Module Federation para publicar correctamente los artefactos remotos y permitir su consumo desde el Shell.

---

# 📦 Instalación

## Requisitos

```bash
Node.js 20.19.0
npm 10.8.2
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm start
```

o

```bash
npx ng serve
```

---

# 🌐 Module Federation

El Shell consume Microfrontends remotos mediante Webpack Module Federation.

Cada Microfrontend mantiene:

- Repositorio independiente.
- Pipeline independiente.
- Variables de entorno propias.
- Ciclo de despliegue independiente.
- Evolución funcional desacoplada.

La incorporación de nuevos Microfrontends requiere registrar el nuevo remoto dentro de los archivos de entorno correspondientes.

---

# 📂 Repositorios Relacionados

```text
shell-root

mfe-auth
mfe-user
mfe-wallet
mfe-recharges
mfe-notifications
mfe-support

mfe-tinka
mfe-kabala
mfe-ganadiario
mfe-ganagol
mfe-kinelo
mfe-videoloterias

mfe-landing
```

---

# 📖 Convenciones

- Cada Microfrontend es responsable de su propio dominio funcional.
- Los despliegues son independientes.
- La comunicación entre aplicaciones debe realizarse mediante contratos definidos y eventos desacoplados.
- No se contempla un estado global compartido entre Microfrontends.
- La persistencia transversal se soporta mediante Local Storage y Cookies.

---

# 🎨 Integración temporal de `@kindryl/tinka-ui`

La versión actualmente instalada de la librería es:

```text
@kindryl/tinka-ui 0.1.32
```

Durante la integración se comprobó que la instalación del paquete, por sí sola, no carga todos los recursos visuales requeridos por sus componentes.

Los componentes dependen actualmente de tres elementos distintos:

1. **Design tokens**, utilizados mediante variables CSS.
2. **Clases utilitarias de Tailwind**, presentes dentro del código compilado de la librería.
3. **Assets**, como logotipos, imágenes y fuentes.

## Configuración temporal aplicada

Para cargar los design tokens se agregó la siguiente ruta en `angular.json`:

```json
"styles": [
  "node_modules/@kindryl/tinka-ui/src/lib/tokens/design-tokens.css",
  "src/styles.scss"
]
```

Asimismo, para que Tailwind detecte y genere las clases utilizadas internamente por los componentes, se agregó el paquete al arreglo `content` de `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/@kindryl/tinka-ui/**/*.{js,mjs}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Con esta configuración se validó correctamente la carga de:

- fondos;
- colores;
- bordes;
- espaciados;
- tamaños;
- estilos de botones;
- distribución y utilidades Tailwind utilizadas por los componentes.

## Motivo técnico

El archivo de configuración de Tailwind analizaba inicialmente solo el código ubicado dentro de `src`:

```javascript
content: ['./src/**/*.{html,ts}'];
```

Por esta razón, Tailwind no detectaba las clases incluidas en los componentes instalados dentro de:

```text
node_modules/@kindryl/tinka-ui
```

Los design tokens sí proporcionaban los valores de color, tipografía, radios y espaciados, pero no generaban por sí solos las reglas CSS correspondientes a clases como `px-4`, `py-2`, `border`, `flex` o `rounded-[...]`.

La inclusión temporal de la librería en `content` permite que el proceso de compilación del Shell genere dichas reglas.

## Consideración de arquitectura

La configuración anterior permite continuar con la integración y validar visualmente los componentes. Sin embargo, mantiene al proyecto consumidor acoplado a detalles internos de construcción y estructura de la librería.

En particular:

- El Shell necesita conocer que la librería fue implementada con Tailwind.
- Tailwind debe analizar archivos ubicados dentro de `node_modules`.
- El consumidor depende de una versión compatible de Tailwind.
- La ruta `src/lib/tokens/design-tokens.css` corresponde a una estructura interna del paquete.
- Una reorganización interna de la librería podría romper la integración sin que cambie su API de componentes.
- Los componentes no quedan completamente independientes del proceso de compilación del proyecto consumidor.

## Implementación recomendada para la librería

Para una librería corporativa reutilizable, se recomienda publicar un archivo CSS procesado y expuesto mediante una ruta pública estable, por ejemplo:

```text
@kindryl/tinka-ui/styles.css
```

Ese archivo debería incluir, como mínimo:

- design tokens;
- estilos Tailwind ya compilados requeridos por los componentes;
- estilos globales propios de la librería;
- declaraciones de fuentes;
- referencias estables a los recursos visuales necesarios.

La integración esperada en el proyecto consumidor debería reducirse a una importación global:

```scss
@import '@kindryl/tinka-ui/styles.css';
```

Como alternativa, podría registrarse el mismo archivo público desde `angular.json`:

```json
"styles": [
  "node_modules/@kindryl/tinka-ui/styles.css",
  "src/styles.scss"
]
```

En este modelo, los componentes de la librería deberían mostrarse correctamente sin que el consumidor tenga que:

- agregar `@kindryl/tinka-ui` al `content` de Tailwind;
- acceder a rutas internas como `src/lib`;
- replicar estilos de la librería;
- conocer la implementación interna de sus componentes.

El proyecto consumidor podría seguir utilizando Tailwind para sus propios estilos, pero el funcionamiento visual básico de la librería no debería depender de que el Tailwind del Shell procese el código interno del paquete.

## Logos, imágenes, fuentes y otros assets

Los recursos visuales de la librería tampoco deberían depender de rutas relativas asociadas a la estructura de una aplicación específica.

Por ejemplo, una referencia como:

```html
<img src="assets/images/logo.svg" alt="La Tinka" />
```

se resuelve contra los assets de la aplicación consumidora y no necesariamente contra los archivos incluidos dentro del paquete. Esto obliga a que todos los proyectos mantengan la misma estructura de carpetas o copien manualmente los mismos archivos.

La librería debería adoptar y documentar una estrategia estable, como una de las siguientes:

- incorporar el SVG directamente dentro del componente;
- exponer el logotipo como un recurso público del paquete;
- permitir que el consumidor entregue la imagen mediante un `@Input`;
- publicar los assets en una carpeta estable y proporcionar una configuración oficial de copia;
- automatizar la instalación y copia de recursos mediante un schematic.

Hasta que esta integración sea corregida en la librería, cualquier copia o resolución manual de assets deberá considerarse temporal y quedar documentada en el proyecto consumidor.

## Estado de la integración

La configuración temporal actual permite continuar con la implementación de los componentes.

Queda pendiente corregir o definir formalmente en la librería:

- la exposición pública de estilos;
- la compilación y distribución de Tailwind;
- la publicación de design tokens mediante una ruta estable;
- la resolución de logotipos, imágenes y fuentes;
- la documentación oficial de instalación y consumo.

---

# 👥 Equipo

Plataforma Frontend SPA basada en Angular, Module Federation y Microfrontends para la modernización digital de La Tinka.

---

# 🏠 Integración del Home

## Objetivo

La integración del Home se está realizando mediante una comparación entre dos implementaciones independientes:

- **Implementación propia del Shell**, desarrollada a partir del diseño de Figma.
- **Implementación provista por `@kindryl/tinka-ui`**, utilizada como referencia para identificar componentes reutilizables.

Ambas implementaciones permanecen disponibles en ramas independientes con el objetivo de comparar visualmente cada sección antes de decidir su reemplazo definitivo.

## Estrategia de integración

La integración no consiste en reemplazar inmediatamente toda la página Home.

Para cada sección se evaluará:

- Equivalencia funcional.
- Equivalencia visual respecto al diseño de Figma.
- Flexibilidad del componente.
- Posibilidad de reutilización.
- Impacto sobre la arquitectura existente.

Solo cuando un componente de la librería cubra completamente la funcionalidad requerida se reemplazará la implementación propia.

## Inventario de componentes

| Sección              | Implementación propia       | Librería                       | Estado        | Decisión                          |
| -------------------- | --------------------------- | ------------------------------ | ------------- | --------------------------------- |
| Banner principal     | ✅                          | ✅ (`TkHomeDesktopComponent`)  | En evaluación | Pendiente                         |
| Hero Tinka           | ✅                          | ✅                             | En evaluación | Pendiente                         |
| Cards de loterías    | ✅ (`LotteryCardComponent`) | ✅ (`TkHomeGameCardComponent`) | En evaluación | Pendiente                         |
| Banner de resultados | ✅                          | ✅                             | En evaluación | Pendiente                         |
| Más juegos           | ✅                          | ✅                             | En evaluación | Pendiente                         |
| Promociones          | ✅                          | ✅                             | En evaluación | Pendiente                         |
| Ganadores            | ✅                          | No identificado                | Pendiente     | Mantener si no existe equivalente |
| Contribuye           | ✅                          | No identificado                | Pendiente     | Mantener si no existe equivalente |
| Footer               | ✅                          | No identificado                | Pendiente     | Mantener si no existe equivalente |

## Hallazgos actuales

Durante las pruebas realizadas se verificó que `TkHomeDesktopComponent` renderiza una composición completa del Home, incluyendo:

- Banner principal.
- Título de la sección.
- Hero de Tinka.
- Cards de juegos.
- Banner de resultados.
- Sección "Más juegos".
- Sección de promociones.

Asimismo, se comprobó que `TkHomeDesktopComponent` utiliza internamente `TkHomeGameCardComponent`, por lo que representan distintos niveles de composición:

- `TkHomeDesktopComponent`: composición completa del Home.
- `TkHomeGameCardComponent`: tarjeta individual de un juego.

La decisión final sobre qué nivel reutilizar dependerá de la comparación funcional y visual con el diseño oficial de Figma. Ningún componente propio será eliminado hasta completar esta evaluación.

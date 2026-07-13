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

# 👥 Equipo

Plataforma Frontend SPA basada en Angular, Module Federation y Microfrontends para la modernización digital de La Tinka.

---

# 🧩 Integración de Componentes UI

Esta rama corresponde a una integración visual de la librería **@kindryl/tinka-ui** dentro del proyecto **shell-root**, con el objetivo de validar la incorporación progresiva de los componentes compartidos sin afectar la implementación funcional existente.

## Alcance

Se realizó el reemplazo visual de los componentes disponibles en la librería, manteniendo la arquitectura y la lógica de negocio implementadas en el proyecto principal.

## Observaciones Técnicas

Durante la integración se identificaron los siguientes aspectos:

- Algunos componentes de la librería actualmente no exponen eventos (`@Output`) para conectar acciones como autenticación, registro, cierre de sesión u otras interacciones con la lógica del proyecto.
- La integración funcional existente permanece implementada en la rama principal del proyecto y podrá reutilizarse cuando los componentes de la librería incorporen dichos puntos de extensión.
- Algunos componentes requieren recursos adicionales (imágenes, logos y fuentes) para visualizarse correctamente dentro del proyecto consumidor.
- Se identificaron diferencias visuales entre algunos componentes de la librería y el diseño aprobado en Figma. Estas diferencias incluyen aspectos como distribución de elementos, espaciados, proporciones, tamaños de algunos componentes y determinados detalles de la interfaz. Dichas diferencias corresponden a la implementación actual de la librería y no al proceso de integración realizado en este proyecto.
- Algunos componentes de la librería agrupan múltiples secciones funcionales dentro de un único componente, mientras que la implementación original del proyecto utiliza una arquitectura modular basada en componentes independientes. Ambas aproximaciones son válidas, pero será conveniente definir una estrategia única para mantener consistencia en la arquitectura del frontend y reducir retrabajos en futuras integraciones.

## Estado

Esta rama tiene como finalidad validar la integración visual de los componentes disponibles en la librería y documentar los aspectos identificados durante dicho proceso. La implementación funcional completa permanece disponible en la rama principal del proyecto.

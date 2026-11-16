# 🏛️ Registro de Excavación Arqueológica V2

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-16625E?style=flat&logo=github)](https://jolabra33-lgtm.github.io/Fichas_Registro_Arqueologico/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-2A7A49?style=flat&logo=pwa)](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps)
[![IndexedDB](https://img.shields.io/badge/Storage-IndexedDB%20Local-23659A?style=flat)](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-9A680F.svg)](LICENSE)

Aplicación web profesional y **Progressive Web App (PWA)** de registro arqueológico estratigráfico en campo. Diseñada específicamente para excavaciones y prospecciones arqueológicas, funciona al **100% sin conexión a internet** directamente desde tabletas (iPad, Android), teléfonos inteligentes o equipos portátiles de campo.

---

## 🚀 Acceso Rápido

* **Aplicación Web:** [Abrir Registro de Excavación V2](https://jolabra33-lgtm.github.io/Fichas_Registro_Arqueologico/) *(o abrir `index.html`)*
* **Manual de Usuario:** [Guía Práctica Ilustrada paso a paso](https://jolabra33-lgtm.github.io/Fichas_Registro_Arqueologico/guia.html) *(o abrir `guia.html`)*

---

## 📑 Índice de Contenidos

- [Características Principales](#-características-principales)
- [Tipos de Fichas Estratigráficas](#-tipos-de-fichas-estratigráficas)
- [Matriz de Harris Interactiva](#-matriz-de-harris-interactiva)
- [Funcionamiento 100% Offline (PWA)](#-funcionamiento-100-offline-pwa)
- [Instalación en Dispositivos](#-instalación-en-dispositivos)
- [Exportación y Compatibilidad Documental](#-exportación-y-compatibilidad-documental)
- [Privacidad y Soberanía del Dato](#-privacidad-y-soberanía-del-dato)
- [Estructura del Repositorio](#-estructura-del-repositorio)
- [Guía para Publicar en GitHub Pages](#-guía-para-publicar-en-github-pages)
- [Licencia](#-licencia)

---

## ✨ Características Principales

* **Autonomía Total en Campo (100% Offline):** No requiere internet ni servidores remotos. Toda la información se almacena localmente de forma persistente en **IndexedDB**.
* **Gestión Multidisciplinar de UEs:** Registro simultáneo de depósitos sedimentarios, zanjas/cortes, estructuras murarias, enterramientos bioantropológicos y análisis de paramentos.
* **Matriz de Harris Dinámica en Tiempo Real:** Algoritmo de diagramado estratigráfico (DAG), cálculo de niveles por ordenación topológica, detección automática de contradicciones temporales/ciclos e interactividad gráfica táctil.
* **Generación de Etiquetas con Códigos QR:** Impresión automática de etiquetas de campo para bolsas de materiales, muestras y cajas con códigos QR escaneables por smartphone.
* **Láminas Tipológicas Integradas:** Visualizador en memoria de tipos de aparejos, ladrillos, fábricas y sedimentos arqueológicos (`plates.js`).
* **Croquis y Fotografías en Campo:** Soporte para adjuntar croquis vectoriales trazados a mano o fotografía directa desde la cámara del dispositivo móvil.
* **Control de Calidad Automático:** Detección de incoherencias estratigráficas, relaciones circulares (A anterior a B y B anterior a A) y avisos de datación invertida.
* **Fusión Inteligente de Jornada (Smart Merge):** Permite sincronizar el trabajo de varios arqueólogos con distintas tabletas al final del día sin sobrescribir información.
* **Copias de seguridad sin límite práctico de fotos:** La copia completa se exporta en ZIP con las fotos como archivos y, si el proyecto es grande, se divide en partes de unos 100 MB. Probado con 500 fotos.
* **Desplegables configurables por proyecto:** Las opciones de *Fase / Complejo* y *Datación provisional* se definen al crear el proyecto, se pueden copiar de otra campaña del mismo yacimiento y se cambian en cualquier momento.
* **Filtros por Fase y por Datación** en la lista de fichas, combinables con el resto de filtros; el Libro de registro (PDF) y el CSV salen solo con las fichas filtradas.
* **Numeración de fichas configurable:** UE 1, 001, 0001 (por defecto) o 00001, y primer número de UE ajustable para cada campaña.
* **Preparada para excavaciones grandes (probada con 700 fichas):** copia incremental diaria (solo las fotos nuevas), archivo de fotos ya respaldadas para liberar espacio en el iPad y guardado rápido de proyectos con muchos croquis (trazos compactados y proyecto guardado como texto JSON).
* **Fotos ligeras:** Las fotos se reducen a 2048 px y se guardan en WebP o JPEG (también en iPad); las guardadas en PNG por versiones anteriores se optimizan automáticamente.

---

## 📋 Tipos de Fichas Estratigráficas

| Tipo | Color Código | Descripción Metodológica |
| :--- | :--- | :--- |
| **Estrato (UE Positiva / Negativa)** | 🟤 Ocre (`#9A680F`) | Depósitos geológicos/antrópicos, rellenos, capas de ceniza, cortes de fosa, zanjas de cimentación, interfaces de destrucción. |
| **Estructura** | 🔴 Ladrillo (`#A03C29`) | Muros, lienzos, pavimentos, hogares, pilares, cimentaciones, silos, canales y fábricas constructivas. |
| **Esqueleto** | 🟣 Ciruela (`#6B4A8A`) | Antropología física, orientación del cuerpo (cabeza/pies), ritual, posición anatómica, cráneo/dentición, paleopatologías y ajuar funerario asociado. |
| **Cata Muraria** | 🔵 Pizarra (`#33578B`) | Arqueología de la arquitectura, lectura estratigráfica de paramentos verticales, fases constructivas y transformaciones edilicias. |

---

## 📊 Matriz de Harris Interactiva

La aplicación incluye un motor matemático que construye de forma instantánea el diagrama estratigráfico:
1. **Detección Automática de Ramas:** Ordenación topológica por capas horizontales.
2. **Alertas de Contradicciones:** Resalta en color carmesí las relaciones temporales anómalas o paradójicas.
3. **Exploración Táctil:** Al pulsar una Unidad Estratigráfica, se resalta automáticamente toda su secuencia anterior y posterior.
4. **Exportación:** Descarga del diagrama completo en formato vectorial **SVG** de alta resolución para publicaciones académicas y memorias técnicas.

---

## 📴 Funcionamiento 100% Offline (PWA)

La aplicación cuenta con una arquitectura basada en **Service Worker (`sw.js`)** con política *Cache-First*:
* En el primer acceso a través de GitHub Pages (o navegador), todos los recursos (código, fuentes, librerías, iconos, tipologías y el manual) se almacenan en la memoria caché del navegador.
* A partir de ese momento, **el dispositivo puede estar en modo avión o en áreas rurales sin cobertura 3G/4G/5G**; la aplicación arrancará con fluidez y velocidad instantáneas.

---

## 📲 Instalación en Dispositivos

### En Tabletas Android o Google Chrome (PC/Mac):
1. Accede al enlace de la aplicación en el navegador.
2. Pulsa en el botón **"Instalar App"** situado al pie del menú lateral (o pulsa en el icono de instalación de la barra de direcciones de Chrome).
3. La aplicación se instalará como una app nativa, con su icono en la pantalla de inicio y ventana a pantalla completa sin barra de navegación.

### En iPad / iPhone (Safari):
1. Abre la web en Safari.
2. Pulsa en el botón de **Compartir** (icono de cuadrado con flecha hacia arriba).
3. Selecciona **"Añadir a la pantalla de inicio"** (Add to Home Screen).
4. Asigna el nombre deseado y pulsa *Añadir*.

---

## 💾 Exportación y Compatibilidad Documental

* **Copia de Seguridad Completa (.zip):** Exporta el proyecto completo (fichas, cotas, croquis, materiales, muestras y fotos). Cada archivo ZIP contiene `registro.json` con los datos y una carpeta `fotos/`. Los proyectos grandes se dividen en partes de unos 100 MB que se importan juntas (o una a una, mediante la Fusión Inteligente).
* **Copia incremental (.zip):** Todas las fichas y solo las fotos que aún no han salido en ninguna copia. Para restaurar: la última copia completa y después las incrementales, por orden, con la Fusión Inteligente.
* **Copia solo de datos (.json):** Las fichas sin fotos, en un archivo de pocos KB.
* **Importación de copias antiguas (.json):** Se admiten las copias JSON de versiones anteriores, aunque ocupen cientos de MB: se leen por trozos sin cargarlas enteras en memoria.
* **Memoria Técnica Word (.docx):** Plantilla editorial con cuadros tipográficos formateados lista para entregar a la administración de Patrimonio Cultural.
* **Sistemas de Información Geográfica (GIS):** Exportación de datos espaciales y cotas lista para vincular con capas de **QGIS** y ortofotografías georreferenciadas.

---

## 🔒 Privacidad y Soberanía del Dato

* **Cero Telemetría:** No se envían datos a servidores externos, plataformas analíticas ni nubes comerciales.
* **Cumplimiento RGPD y Secreto Arqueológico:** La ubicación de yacimientos inéditos y materiales de valor permanece estrictamente protegida en la memoria física de tu dispositivo.

---

## 📁 Estructura del Repositorio

```text
├── icons/
│   ├── icon-192.png              # Icono PWA (192x192 px)
│   ├── icon-512.png              # Icono PWA (512x512 px maskable)
│   └── icon.svg                  # Icono vectorial oficial
├── .gitignore                    # Reglas de exclusión para Git
├── .nojekyll                     # Desactiva el procesador Jekyll en GitHub Pages
├── guia.html                     # Manual de usuario ilustrado (15 secciones)
├── index.html                    # La aplicación (página única)
├── jszip.min.js                  # Librería para exportación de archivos ZIP
├── LICENSE                       # Licencia MIT
├── manifest.json                 # Descriptor PWA (Nombre, tema, iconos, pantalla)
├── plates.js                     # Base de datos vectorial de láminas y tipologías
├── qrcode.min.js                 # Motor de generación de códigos QR
├── README.md                     # Documentación general del repositorio
├── sw.js                         # Service Worker para ejecución y caché 100% offline
├── Registro_de_Excavacion_V2.html# Redirección a index.html (dirección antigua)
└── Guia_de_Uso_Aplicacion_V2.html# Redirección a guia.html (dirección antigua)
```

---

## 🚀 Guía para Publicar en GitHub Pages

Para subir este repositorio a tu cuenta de GitHub y activar GitHub Pages, sigue estos pasos:

### Paso 1: Crear el repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com/).
2. Haz clic en el botón verde **"New"** (Nuevo repositorio) en la esquina superior izquierda.
3. Asigna un nombre al repositorio, por ejemplo: `Fichas_Registro_Arqueologico`.
4. Selecciónalo como **Public** (Público).
5. **No** marques las casillas de *Initialize with README*, *.gitignore* o *License* (ya los tenemos preparados aquí).
6. Haz clic en **"Create repository"**.

### Paso 2: Subir los archivos desde tu terminal
Abre una consola de comandos en la carpeta `v2` y ejecuta:

```bash
# 1. Inicializar git en la rama main
git init -b main

# 2. Añadir todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: publicación oficial de Registro de Excavación Arqueológica V2 (PWA)"

# 4. Vincular con tu repositorio de GitHub (sustituye tu usuario y repo si varían)
git remote add origin https://github.com/jolabra33-lgtm/Fichas_Registro_Arqueologico.git

# 5. Subir el código
git push -u origin main
```

*(Si utilizas **GitHub Desktop**, simplemente selecciona `File > Add Local Repository`, elige esta carpeta y haz clic en `Publish repository`).*

### Paso 3: Activar GitHub Pages
1. En tu repositorio en GitHub, entra en la pestaña **Settings** (Configuración) en la barra superior.
2. En el menú de la izquierda, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   * **Source:** Selecciona **Deploy from a branch**.
   * **Branch:** Selecciona `main` y en la carpeta deja `/ (root)`.
   * Haz clic en **Save** (Guardar).
4. En 1-2 minutos tu aplicación estará publicada y accesible para todo el mundo en:
   ```text
   https://jolabra33-lgtm.github.io/Fichas_Registro_Arqueologico/
   ```

### Paso 4: Publicar una versión nueva
Cada vez que cambies la aplicación, sube a `CACHE_NAME` en `sw.js` el número final (por ejemplo, de `…-cache-v4` a `…-cache-v5`) antes de hacer `git push`. Así los dispositivos que ya tienen la app instalada descargan la versión nueva (puede hacer falta abrirla dos veces).

> ⚠️ **No subas copias de seguridad al repositorio.** Los archivos `.zip` y `.json` exportados contienen datos de yacimientos y fotografías; el `.gitignore` ya los excluye.

---

## 📜 Licencia

Este proyecto está publicado bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles. Desarrollado para la comunidad arqueológica e investigadora del patrimonio histórico.

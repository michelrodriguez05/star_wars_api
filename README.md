## MusiqueSt

**Aplicación web Front‑End** que consume la API pública de Deezer para mostrar información de artistas, álbumes, géneros y el top global de manera interactiva, atractiva y responsiva.

---

## 📖 Descripción

MusiqueSt es una SPA Front‑End desarrollada con HTML, CSS y JavaScript puro (con ayuda de Tailwind o tu propio CSS). Permite al usuario:

- Buscar artistas por nombre.
- Explorar los álbumes de un artista.
- Navegar entre distintos géneros musicales.
- Ver el Top Global de canciones en Deezer.

Toda la información se obtiene dinámicamente desde la [API pública de Deezer](https://developers.deezer.com/api) mediante un proxy para evitar problemas de CORS.

---

## 🚀 Funcionalidades

1. **Búsqueda de Artistas**  
   - Formulario de búsqueda por nombre.
   - Resultados con imagen, nombre y número de fans.


2. **Listado de Géneros**  
   - Muestra todos los géneros musicales (excepto ID 0).
   - Tarjetas con imagen y nombre de cada género.

3. **Top Global**  
   - Lista las canciones más populares a nivel mundial.
   - Tarjetas con portada de álbum, título y artista.

4. **Responsive Design**  
   - En móvil, las tarjetas se apilan en columna.
   - En escritorio, se muestran en grilla fluida.

---

## 🛠 Tecnologías y Herramientas

- **HTML5**  
- **CSS3**  
- **JavaScript**  
- **Proxy CORS**: [corsproxy.io](https://corsproxy.io) / [AllOrigins](https://api.allorigins.win)  
 

---


```
## ⚙️ Estructuraciòn

musiquest/
│
├── fonts/             
│   └── koulen_5.2.6.zip
│
├── img/               
│   ├── logo.png
│   ├── portadas…
│   └── …
│
├── html/
│   ├── index.html       ← Búsqueda de Artistas
│   ├── album.html       ← Visualización de Álbumes
│   ├── genero.html      ← Exploración de Géneros
│   └── top.html         ← Top Global
│
├── java.js/
│   ├── api.js           ← Módulo de conexión a Deezer
│   ├── busqueda.js      ← Lógica de búsqueda de artistas
│   ├── album.js         ← Lógica de álbumes
│   ├── genero.js        ← Lógica de géneros
│   └── top.js           ← Lógica de Top Global
│
├── styles.css           ← Estilos globales y responsivos
│
└── README.md            ← ¡Este archivo!
```

---

## 🎨 Maquetación

> **Ejemplos de la interfaz** 

| Búsqueda de Artistas | Listado de Géneros | Top Global          |
|:--------------------:|:------------------:|:-------------------:|
| ![Artistas](./img/art.png) | ![Géneros](./img/gene.png) | ![Top](./img/top.png) |

---

## 🚀 Instalación y Ejecución

1. **Clona** el repositorio:
   ```bash
   git clone (https://github.com/michelrodriguez05/pag_web_api_javaScript)
   cd musiquest
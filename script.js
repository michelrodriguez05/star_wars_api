// script.js

const API_URL = 'https://swapi.py4e.com/api/'; 
let currentSection = 'people';
const cache = {};

// Inicializa página principal
function initIndexPage() {
    const iniciarViajeBtn = document.getElementById('iniciarViaje');
    if (iniciarViajeBtn) {
        iniciarViajeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoadingScreen();
            setTimeout(() => {
                window.location.href = 'busquedas.html';
            }, 2000);
        });
    }

    window.addEventListener('load', () => hideLoadingScreen());
}

// Muestra pantalla de carga
function showLoadingScreen() {
    const loading = document.getElementById('loadingScreen');
    if (loading) loading.style.display = 'flex';
}

// Oculta pantalla de carga
function hideLoadingScreen() {
    const loading = document.getElementById('loadingScreen');
    if (loading) loading.style.display = 'none';
}

// Obtiene ID desde URL
function getIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}

// Obtiene imagen local o usa placeholder
function getImageUrl(id, type) {
    const imageType = type === 'people' ? 'characters' : type;
    try {
        return `./assets/images/${imageType}/${id}.jpg`;
    } catch (error) {
        return '';
    }
}

// Manejador de error de imágenes
function handleImageError(img, type) {
    const placeholders = {
        people: 'https://via.placeholder.com/300x400/1a1a2e/FFE81F?text=Personaje',
        planets: 'https://via.placeholder.com/300x400/1a1a2e/FFE81F?text=Planeta',
        starships: 'https://via.placeholder.com/300x400/1a1a2e/FFE81F?text=Nave',
        films: 'https://via.placeholder.com/300x400/1a1a2e/FFE81F?text=Película'
    };
    img.src = placeholders[type] || placeholders.people;
}

// Obtiene todos los datos paginados
async function fetchAllData(endpoint) {
    if (cache[endpoint]) return cache[endpoint];

    let allResults = [];
    let url = `${API_URL}${endpoint}`;

    try {
        while (url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error en ${endpoint}: ${response.statusText}`);
            const data = await response.json();
            allResults = [...allResults, ...data.results];
            url = data.next;
        }
        cache[endpoint] = allResults;
        return allResults;
    } catch (error) {
        console.error('Error fetching data:', error);
        showErrorNotification(`No se pudieron cargar los datos de ${endpoint}.`);
        return [];
    }
}

// Muestra notificación de error
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded shadow-lg z-50';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// Función genérica para renderizar items
function renderItems(data, section, templateFn) {
    const container = document.getElementById(`results-${section}`);
    const loader = document.getElementById(`loading-${section}`);
    if (!container || !loader) return;

    loader.style.display = 'none';
    if (data.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400">No se encontraron resultados.</p>';
    } else {
        container.innerHTML = data.map(templateFn).join('');
    }
}

// Renderiza personajes
function displayPeople(data) {
    renderItems(data, 'people', (person) => {
        const id = getIdFromUrl(person.url);
        const imageUrl = getImageUrl(id, 'people');
        return `
            <div class="card p-4 rounded-lg shadow-lg">
                <img src="${imageUrl}" alt="${person.name}" class="w-full h-64 object-cover rounded mb-4"
                     onerror="handleImageError(this, 'people')">
                <h3 class="text-xl font-bold text-yellow-400 mb-3">${person.name}</h3>
                <p><span class="text-yellow-400">Altura:</span> ${person.height} cm</p>
                <p><span class="text-yellow-400">Peso:</span> ${person.mass} kg</p>
            </div>`;
    });
}

// Renderiza planetas
function displayPlanets(data) {
    renderItems(data, 'planets', (planet) => {
        const id = getIdFromUrl(planet.url);
        const imageUrl = getImageUrl(id, 'planets');
        return `
            <div class="card p-4 rounded-lg shadow-lg">
                <img src="${imageUrl}" alt="${planet.name}" class="w-full h-64 object-cover rounded mb-4"
                     onerror="handleImageError(this, 'planets')">
                <h3 class="text-xl font-bold text-yellow-400 mb-3">${planet.name}</h3>
                <p><span class="text-yellow-400">Clima:</span> ${planet.climate}</p>
                <p><span class="text-yellow-400">Terreno:</span> ${planet.terrain}</p>
            </div>`;
    });
}

// Renderiza naves
function displayStarships(data) {
    renderItems(data, 'starships', (ship) => {
        const id = getIdFromUrl(ship.url);
        const imageUrl = getImageUrl(id, 'starships');
        return `
            <div class="card p-4 rounded-lg shadow-lg">
                <img src="${imageUrl}" alt="${ship.name}" class="w-full h-64 object-cover rounded mb-4"
                     onerror="handleImageError(this, 'starships')">
                <h3 class="text-xl font-bold text-yellow-400 mb-3">${ship.name}</h3>
                <p><span class="text-yellow-400">Modelo:</span> ${ship.model}</p>
                <p><span class="text-yellow-400">Velocidad Máxima:</span> ${ship.max_atmosphering_speed} km/h</p>
            </div>`;
    });
}

// Renderiza películas
function displayFilms(data) {
    renderItems(data, 'films', (film) => {
        const id = getIdFromUrl(film.url);
        const imageUrl = getImageUrl(id, 'films');
        return `
            <div class="card p-4 rounded-lg shadow-lg">
                <img src="${imageUrl}" alt="${film.title}" class="w-full h-64 object-cover rounded mb-4"
                     onerror="handleImageError(this, 'films')">
                <h3 class="text-xl font-bold text-yellow-400 mb-3">${film.title}</h3>
                <p><span class="text-yellow-400">Episodio:</span> ${film.episode_id}</p>
                <p><span class="text-yellow-400">Director:</span> ${film.director}</p>
            </div>`;
    });
}

// Cambia entre secciones
function setupNavigation() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const section = e.target.dataset.section;
            if (!section) return;

            // Mostrar loader
            showLoadingScreen();

            // Oculta todas las secciones
            document.querySelectorAll('.section-content').forEach(sec => sec.classList.add('hidden'));

            // Muestra la sección seleccionada
            const selectedSection = document.getElementById(section);
            if (selectedSection) selectedSection.classList.remove('hidden');

            // Marca el botón activo
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Carga datos si es necesario
            if (!cache[section]) {
                const data = await fetchAllData(section);
                switch (section) {
                    case 'people': displayPeople(data); break;
                    case 'planets': displayPlanets(data); break;
                    case 'starships': displayStarships(data); break;
                    case 'films': displayFilms(data); break;
                }
            }

            // Ocultar loader
            hideLoadingScreen();
        });
    });
}

// Búsqueda y filtrado
function setupSearch() {
    const form = document.getElementById('searchForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('searchInput').value.trim().toLowerCase();

        if (!query) {
            showErrorNotification('Por favor, ingresa un término de búsqueda.');
            return;
        }

        showLoadingScreen();

        const sectionsToSearch = ['people', 'planets', 'starships', 'films'];

        for (const section of sectionsToSearch) {
            let data = cache[section] || await fetchAllData(section);
            data = data.filter(item => item.name?.toLowerCase().includes(query));
            switch (section) {
                case 'people': displayPeople(data); break;
                case 'planets': displayPlanets(data); break;
                case 'starships': displayStarships(data); break;
                case 'films': displayFilms(data); break;
            }
        }

        hideLoadingScreen();
    });
}

// Inicia la aplicación
function initSearchPage() {
    setupNavigation();

    // Carga inicial de datos y muestra directamente la sección 'people'
    fetchAllData('people/').then(data => {
        displayPeople(data);
        document.getElementById('people').classList.remove('hidden');
    });

    fetchAllData('planets/').then(displayPlanets);
    fetchAllData('starships/').then(displayStarships);
    fetchAllData('films/').then(displayFilms);
}

// Inicio general
function init() {
    if (document.body.id === 'index-body') {
        initIndexPage();
    } else if (document.body.id === 'busquedas-body') {
        initSearchPage();
    }
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', hideLoadingScreen);
window.onerror = (event) => {
    console.error('Error capturado:', event);
    showErrorNotification('Ocurrió un error inesperado. Por favor, recarga la página.');
};

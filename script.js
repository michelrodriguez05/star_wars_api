const API_URL = 'https://swapi.py4e.com/api/';
const resourceTypeSelect = document.getElementById('resourceType');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

function getIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

async function fetchData(resource, query = '') {
  try {
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    resultsDiv.innerHTML = '';

    const url = query
      ? `${API_URL}${resource}/?search=${encodeURIComponent(query)}`
      : `${API_URL}${resource}/`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');

    const data = await response.json();
    if (data.results.length === 0) {
      errorDiv.textContent = 'No se encontraron resultados.';
      errorDiv.style.display = 'block';
      return;
    }

    displayResults(data.results, resource);
  } catch (error) {
    errorDiv.textContent = 'Se produjo un error al cargar los datos.';
    errorDiv.style.display = 'block';
  } finally {
    loadingDiv.style.display = 'none';
  }
}

function displayResults(items, resource) {
  resultsDiv.innerHTML = items.map(item => {
    const id = getIdFromUrl(item.url);
    const imageType = resource === 'people' ? 'characters' : resource;
    const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`;

    let content = `
      <div class="card p-4 rounded-lg shadow-lg">
        <img src="${imageUrl}" alt="${item.name}" class="w-full h-48 object-cover rounded mb-4 border border-yellow-500">
        <h2 class="text-xl font-semibold text-yellow-400">${item.name}</h2>
    `;

    if (resource === 'people') {
      content += `
        <p>Altura: ${item.height} cm</p>
        <p>Peso: ${item.mass} kg</p>
        <p>Color de pelo: ${item.hair_color}</p>
        <p>Color de ojos: ${item.eye_color}</p>
      `;
    } else if (resource === 'planets') {
      content += `
        <p>Clima: ${item.climate}</p>
        <p>Terreno: ${item.terrain}</p>
        <p>Población: ${item.population}</p>
      `;
    } else if (resource === 'starships') {
      content += `
        <p>Modelo: ${item.model}</p>
        <p>Fabricante: ${item.manufacturer}</p>
        <p>Pasajeros: ${item.passengers}</p>
      `;
    }

    content += `</div>`;
    return content;
  }).join('');
}

// Eventos
searchButton.addEventListener('click', () => {
  const resource = resourceTypeSelect.value;
  const query = searchInput.value.trim();
  fetchData(resource, query);
});

resourceTypeSelect.addEventListener('change', () => {
  fetchData(resourceTypeSelect.value);
});

// Carga inicial
fetchData('people');

const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      toatlPages: 1,
      totalResults: 0
    },
    api: {
      apiKey: 'ae8ec6c090530b4701b47794977f83ee',
      apiUrl: 'https://api.themoviedb.org/3/'
    }
};

// Display popular movies
async function displayPopularMovies() {
    const {results} = await fetchAPIDATA('movie/popular')
    
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
            class="card-img-top" alt="${movie.title}"/>`
            
            : `<img src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
            />`
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small?
        </p>
        </div>`;

        document.querySelector('#popular-movies').appendChild(div);
    })
}

// Display popular tv shows
async function displayPopularShows() {
    const {results} = await fetchAPIDATA('tv/popular')
    
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
            class="card-img-top" alt="${show.name}"/>`
            
            : `<img src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
            />`
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${show.first_air_date}</small?
        </p>
        </div>`;

        document.querySelector('#popular-shows').appendChild(div);
    })
}

// Display Movie Detail
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIDATA(`movie/${movieId}`);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
    <div>
    ${
        movie.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        class="card-img-top" alt="${movie.title}"/>`
        
        : `<img src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
        />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} </li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
  </div>`;

  document.querySelector('#movie-details').appendChild(div);
}

// Display Show Detail
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];

    const show = await fetchAPIDATA(`tv/${showId}`);

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
    <div>
    ${
        show.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
        class="card-img-top" alt="${show.name}"/>`
        
        : `<img src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
        />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${(show.number_of_episodes)}</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${(show.last_episode_to_air.air_date)}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
  </div>`;

  document.querySelector('#show-details').appendChild(div);
}

// display slider movies
async function displaySlider() {
  const { results } = await fetchAPIDATA('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();

  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  });
}

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.3';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// Search Movie/Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term')

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results} = await searchAPIDATA();

    global.search.page = page;
    global.search.toatlPages = total_pages;
    global.search.totalResults = total_results;
    
    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';

  } else {
    showAlert('Please enter search term', 'error');
  }
}

function displaySearchResults(results) {

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    ${
        result.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" 
        class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}"/>`
        
        : `<img src="../images/no-image.jpg"
        class="card-img-top"
        alt="${global.search.type === 'movie' ? result.title : result.name}"
        />`
    }
    </a>
    <div class="card-body">
    <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
    <p class="card-text">
    <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small?
    </p>
    </div>`;

    document.querySelector('#search-results').appendChild(div);
})

}

// Fetch data from TMDB API
async function fetchAPIDATA(endpoint) {
    const API_KEY =global.api.apiKey;
    const API_URL = global.api.apiUrl;

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();
    //console.log(response)
    return data;
}

// Make request to search
async function searchAPIDATA() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);

  const data = await response.json();

  hideSpinner();
  //console.log(response)
  return data;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

// Highlight Active Link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });

}

// Show Alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 2000);
}

function addCommasToNumber(number) {
    const formattedNumber = number.toLocaleString();
    return formattedNumber;
  }

// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break
        case '/shows.html':
            displayPopularShows();
            break
        case '/tv-details.html':
            displayShowDetails();
            break
        case '/search.html':
            search();
            break
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init());


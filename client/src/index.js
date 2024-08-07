import './scss/style.scss';
import axios from 'axios';
import Storage from './js/storage';
import { displayPopularContent } from './js/home';
import { search } from './js/search';
import { displayMovieDetails } from './js/movie-details';
import { displayTvShowDetails } from './js/tv-details';
import { headerInner, footerInner } from './js/baseHTML';

// ----------------
const header = document.querySelector('.main-header');
const footer = document.querySelector('.main-footer');

const loadBaseHtml = () => {
  header.innerHTML = headerInner;
  footer.innerHTML = footerInner;
};

// ----------------------
async function fetchApiData(endpoint) {
  showSpinner();
  const response = await axios.get('/content', {
    params: { endpoint },
  });

  const data = response.data.data;

  hideSpinner();

  return data;
}

// -------------------
function highlightActiveLink(type) {
  const movieNavLink = document.querySelector('.movies-nav-link');
  const tvShowsNavLink = document.querySelector('.shows-nav-link');

  document.querySelector('.nav-link.active').classList.remove('active');

  type === 'movie'
    ? movieNavLink.classList.add('active')
    : tvShowsNavLink.classList.add('active');
}

// function to leave only sections needed
function clearBody(arrayOfIds) {
  const sections = Array.from(document.querySelectorAll('section'));
  const sectionsToShow = sections.filter((section) =>
    arrayOfIds.includes(section.getAttribute('id'))
  );
  const sectionsToHide = sections.filter(
    (section) => !arrayOfIds.includes(section.getAttribute('id'))
  );

  sectionsToShow.forEach((section) => (section.style.display = 'block'));
  sectionsToHide.forEach((section) => (section.style.display = 'none'));
}

// -------------------
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// --------------

const reloadCurrentPage = async () => {
  loadBaseHtml();

  switch (Storage.getCurrentPage()) {
    case 'movie':
      displayPopularContent('movie');
      break;

    case 'tv':
      displayPopularContent('tv');
      break;

    case 'Movie Details':
      const movie = await fetchApiData(
        `movie/${Storage.getCurrentContentId()}`
      );
      displayMovieDetails(movie);
      break;

    case 'Tv Show Details':
      const show = await fetchApiData(`tv/${Storage.getCurrentContentId()}`);
      displayTvShowDetails(show);
      break;

    default:
      displayPopularContent('movie');
      break;
  }
};

// --------------------------
const addEventListeners = () => {
  document
    .querySelector('.main-header .logo')
    .addEventListener('click', displayPopularContent.bind(null, 'movie'));
  document
    .querySelector('.movies-nav-link')
    .addEventListener('click', displayPopularContent.bind(null, 'movie'));
  document
    .querySelector('.shows-nav-link')
    .addEventListener('click', displayPopularContent.bind(null, 'tv'));

  document
    .querySelector('.main-footer .logo')
    .addEventListener('click', displayPopularContent.bind(null, 'movie'));
  document.querySelector('.search-form').addEventListener('submit', search);
};

const init = (e) => {
  reloadCurrentPage(e);
  addEventListeners();
};

window.addEventListener('DOMContentLoaded', init);

export {
  fetchApiData,
  highlightActiveLink,
  showSpinner,
  hideSpinner,
  clearBody,
  numberWithCommas,
};

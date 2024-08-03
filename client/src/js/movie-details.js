import Storage from './storage';
import {
  highlightActiveLink,
  clearBody,
  fetchApiData,
  numberWithCommas,
} from '..';
import { displayPopularContent } from './home';

// Variables ----------
const detailsSection = document.getElementById('details-section');
const detailsDiv = document.getElementById('details');
const posterImageDiv = document.querySelector('#details .poster-image');
const infoDivTop = document.querySelector('.info-top');
const infoDivBottom = document.querySelector(`#details .info-bottom`);

// ----------------------------
const clearDetailsContent = () => {
  posterImageDiv.innerHTML = '';
  infoDivTop.innerHTML = '';
  infoDivBottom.innerHTML = '';
};

const displayBackgroundOverlay = (backdrop_path) => {
  detailsSection.style.background = `url(https://image.tmdb.org/t/p/original${backdrop_path}) no-repeat center center/cover`;
};

// Details Top ----------------
const displayPosterImage = (content) => {
  const img = document.createElement('img');
  const src = content.poster_path
    ? `//image.tmdb.org/t/p/w500${content.poster_path}`
    : '../images/no-image.jpg';
  img.setAttribute('src', src);
  content.title && img.setAttribute('alt', content.title);
  content.name && img.setAttribute('alt', content.name);
  posterImageDiv.appendChild(img);
};

const displayTitle = (content) => {
  const h2 = document.createElement('h2');
  content.title
    ? (h2.innerText = content.title)
    : (h2.innerText = content.name);

  infoDivTop.appendChild(h2);
};

const displayRatings = (movie) => {
  const ratings = document.createElement('div');
  ratings.innerHTML = `
    <i class="fas fa-star text-primary"></i>
    <strong>${movie.vote_average.toFixed(1)} / 10 </strong>
  `;
  infoDivTop.appendChild(ratings);
};

const displayReleaseDate = (type, content) => {
  const releaseParagraph = document.createElement('p');
  releaseParagraph.className = 'text-muted';

  const releaseDate = document.createElement('p');

  type === 'movie'
    ? (releaseDate.innerHTML = `<strong>Release Date: </strong>&emsp; ${content.release_date}`)
    : (releaseDate.innerHTML = `<strong>First Air Date: </strong>&emsp; ${content.first_air_date}`);

  infoDivTop.appendChild(releaseDate);
  infoDivTop.appendChild(releaseParagraph);
};

const displayOverview = (movie) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.innerText = movie.overview;
  infoDivTop.appendChild(overviewParagraph);
};

const displayGenres = (movie) => {
  const h4 = document.createElement('h4');
  h4.innerText = 'Genres';
  infoDivTop.appendChild(h4);

  const ul = document.createElement('ul');
  ul.className = 'list-group';

  movie.genres
    .map((genre) => genre.name)
    .forEach((genreName) => {
      const li = document.createElement('li');
      li.innerText = genreName;
      ul.appendChild(li);
    });
  infoDivTop.appendChild(ul);
};

const displayHomepage = (type, content) => {
  if (content.homepage) {
    const a = document.createElement('a');
    a.setAttribute('href', content.homepage);
    a.setAttribute('target', '_blank');
    a.className = 'btn';
    a.innerText = `Visit ${type} Homepage`;
    infoDivTop.appendChild(a);
  }
};

function fillDetailsTopDiv(movie) {
  displayPosterImage(movie);
  displayTitle(movie);
  displayRatings(movie);
  displayReleaseDate('movie', movie);
  displayOverview(movie);
  displayGenres(movie);
  displayHomepage('Movie', movie);
}

// Details Bottom ----------------------------
const displayMovieInfo = (movie) => {
  const ul = document.createElement('ul');

  const infos = [
    {
      name: 'Budget',
      value: movie.budget,
    },
    {
      name: 'Revenue',
      value: movie.revenue,
    },
    {
      name: 'Runtime',
      value: movie.runtime,
    },
    {
      name: 'Status',
      value: movie.status,
    },
  ];

  for (let entry of infos) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = `<strong class="text-secondary">${entry.name}: </strong>&ensp;`;
    li.appendChild(span);

    switch (entry.name) {
      case 'Budget':
      case 'Revenue':
        entry.value == 0 && (li.style.display = 'none');
        li.insertAdjacentText('beforeend', '$' + numberWithCommas(entry.value));
        break;

      case 'Runtime':
        li.insertAdjacentText('beforeend', entry.value + ' minutes');
        break;

      default:
        li.insertAdjacentText('beforeend', entry.value);
        break;
    }
    ul.appendChild(li);
  }
  infoDivBottom.appendChild(ul);
};

const displayProductionCompanies = (movie) => {
  const companiesDiv = document.createElement('div');
  companiesDiv.classList.add('companies');
  const span = document.createElement('span');
  span.innerHTML = `<strong class="text-secondary">Production: </strong>&ensp;`;

  companiesDiv.appendChild(span);

  const companiesList = document.createElement('span');
  companiesList.innerText = movie.production_companies
    .map((company) => company.name)
    .join(', ');
  companiesDiv.appendChild(companiesList);

  infoDivBottom.appendChild(companiesDiv);
};

function fillDetailsBottomDiv(movie) {
  const h2 = document.createElement('h2');
  h2.innerText = 'Movie Info';
  infoDivBottom.appendChild(h2);

  displayMovieInfo(movie);
  displayProductionCompanies(movie);
}

// ------------------
const addBackBtn = (type) => {
  const button = document.createElement('button');
  button.type = button;
  button.classList.add('btn');

  type === 'movie'
    ? (button.innerText = 'Back To Movies')
    : (button.innerText = 'Back To TV Shows');
  button.addEventListener('click', displayPopularContent.bind(null, type));

  return button;
};

const handleBackBtn = (type) => {
  const backBtnDiv = document.querySelector('.back');
  backBtnDiv.innerHTML = '';
  backBtnDiv.appendChild(addBackBtn(type));
};

// Display Movie Details --------------
const displayMovieDetails = async (movie) => {
  highlightActiveLink('movie');
  document.getElementById('popular').innerHTML = '';
  clearBody(['details-section']);
  clearDetailsContent('movie');
  handleBackBtn('movie');

  const detailsMovie = await fetchApiData(`movie/${movie.id}`);
  displayBackgroundOverlay(detailsMovie.backdrop_path);
  fillDetailsTopDiv(detailsMovie);
  fillDetailsBottomDiv(detailsMovie);

  Storage.setCurrentPage('Movie Details');
  Storage.setCurrentContentId(movie.id);
};

// ------------
export {
  detailsSection,
  detailsDiv,
  infoDivBottom,
  clearDetailsContent,
  displayBackgroundOverlay,
  handleBackBtn,
  displayMovieDetails,
  displayPosterImage,
  displayTitle,
  displayRatings,
  displayReleaseDate,
  displayHomepage,
  displayOverview,
  displayProductionCompanies,
  displayGenres,
};

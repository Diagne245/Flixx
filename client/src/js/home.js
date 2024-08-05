import Storage from './storage';
import { highlightActiveLink, clearBody, fetchApiData } from '..';
import { displayMovieDetails } from './movie-details';
import { displayTvShowDetails } from './tv-details';
import { searchInput } from './search';

// Implementing Swiper----------------------
const displaySlider = async (type) => {
  document.querySelector('.swiper-wrapper').innerHTML = '';
  let data = {};
  type === 'movie'
    ? (data = await fetchApiData('movie/now_playing'))
    : (data = await fetchApiData('trending/tv/week'));

  const { results } = data;
  results.forEach((content) => {
    createSlideCard(type, content);
  });
};

// Slider ---------------------------
const slideRatings = (content) => {
  const h4 = document.createElement('h4');
  h4.className = 'swiper-rating';

  const i = document.createElement('i');
  i.className = 'fas fa-star text-secondary';
  h4.appendChild(i);

  h4.insertAdjacentText(
    'beforeend',
    ` ${content.vote_average.toFixed(1)} / 10`
  );

  return h4;
};

// Display Popular Content ------------------------------
const popularDiv = document.getElementById('popular');

const cardImage = (type, content) => {
  const a = document.createElement('a');

  const img = document.createElement('img');
  const src = content.poster_path
    ? `//image.tmdb.org/t/p/w500${content.poster_path}`
    : '../images/no-image.jpg';

  img.setAttribute('src', src);

  if (type === 'movie') {
    img.setAttribute('alt', content.title);
    a.addEventListener('click', displayMovieDetails.bind(null, content));
  } else {
    img.setAttribute('alt', content.name);
    a.addEventListener('click', displayTvShowDetails.bind(null, content));
  }

  a.appendChild(img);

  return a;
};

const cardBody = (type, content) => {
  const insideDiv = document.createElement('div');
  insideDiv.className = 'card-body';

  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  const p = document.createElement('p');
  p.className = 'card-text';
  const small = document.createElement('small');
  small.className = 'text-muted';

  if (type === 'movie') {
    h5.innerText = content.title;
    small.innerText = 'Release: ' + content.release_date;
  } else {
    h5.innerText = content.name;
    small.innerText = 'Air Date: ' + content.first_air_date;
  }

  p.appendChild(small);
  insideDiv.appendChild(h5);
  insideDiv.appendChild(p);

  return insideDiv;
};

// -------------------
const createSlideCard = (type, content) => {
  const slideDiv = document.createElement('div');
  slideDiv.className = 'swiper-slide';

  slideDiv.appendChild(cardImage(type, content));
  slideDiv.appendChild(slideRatings(content));

  document.querySelector('.swiper-wrapper').appendChild(slideDiv);
};

const createContentCard = (type, content) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  cardDiv.appendChild(cardImage(type, content));
  cardDiv.appendChild(cardBody(type, content));

  return cardDiv;
};

const displayPopularContent = async (type) => {
  highlightActiveLink(type);

  displaySlider(type);

  const nowPlayingH2 = document.querySelector('.now-playing h2');
  const popularH2 = document.querySelector('#popular-section h2');
  type === 'movie'
    ? (nowPlayingH2.innerText = 'Now Playing') &&
      (popularH2.innerText = 'Popular Movies')
    : (nowPlayingH2.innerText = 'Trending TV Shows') &&
      (popularH2.innerText = 'Popular Tv Shows');

  clearBody(['now-playing', 'search', 'popular-section']);
  searchInput.value = '';
  searchInput.blur();
  popularDiv.innerHTML = '';

  const { results } = await fetchApiData(`${type}/popular`);
  results.forEach((content) => {
    popularDiv.appendChild(createContentCard(type, content));
  });

  Storage.setCurrentPage(type);
};

// ----------------
export {
  createContentCard,
  displayPopularContent,
  highlightActiveLink,
  slideRatings,
  cardImage,
  cardBody,
};

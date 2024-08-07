import axios from 'axios';
import { showSpinner, hideSpinner, clearBody } from '..';
import { createContentCard } from './home';

// Variables ----------------
const searchForm = document.querySelector('.search-form');

const params = {
  type: '',
  searchTerm: '',
  page: 1,
  totalPages: 0,
  totalResults: 0,
};

// Search Methods ---------------
const search = async (e) => {
  e.preventDefault();

  const searchInput = searchForm.querySelector('.search-input');

  if (searchInput.value === '' || searchInput.value === null) {
    showAlert('Please Enter a Search Term', 'alert error');
    return;
  }

  const { results } = await searchApiData();

  if (params.totalResults === 0) {
    showAlert('No Results Found', 'alert error');
  } else {
    displaySearchResults(params.type, results);
  }
};

const displayNumberOfResults = () => {
  document.querySelector('.search-results-heading').innerHTML = `${
    params.totalResults > 1
      ? `<span class='text-secondary'>${params.totalResults}</span> ${
          params.type === 'movie' ? 'movies' : 'TV Shows'
        } found`
      : `<span class='text-secondary'>${params.totalResults}</span> ${
          params.type === 'movie' ? 'movie' : 'TV Show'
        } found`
  }`;
};

// ---------------------
const searchResults = document.getElementById('search-results');

const resetDisplayContainer = () => {
  clearBody(['now-playing', 'search', 'search-results-wrapper']);
  document.querySelector('.search-results-heading').innerHTML = '';
  searchResults.innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
};

const displaySearchResults = (type, results) => {
  resetDisplayContainer();
  displayNumberOfResults();

  results.forEach((result) => {
    searchResults.appendChild(createContentCard(type, result));
  });

  displayPagination();
};

const displayPagination = () => {
  const div = document.createElement('div');
  div.className = 'pagination';

  const previousBtn = document.createElement('button');
  previousBtn.setAttribute('id', 'prev');
  previousBtn.className = 'btn btn-primary';
  previousBtn.appendChild(document.createTextNode('Prev'));
  previousBtn.addEventListener('click', showPrevPage);
  div.appendChild(previousBtn);

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('id', 'next');
  nextBtn.className = 'btn btn-primary';
  nextBtn.appendChild(document.createTextNode('Next'));
  nextBtn.addEventListener('click', showNextPage);
  div.appendChild(nextBtn);

  const pageCounter = document.createElement('div');
  pageCounter.className = 'page-counter';
  pageCounter.innerHTML = `
    <span class='text-secondary'>${params.page}</span> of ${params.totalPages} Pages
  `;
  div.appendChild(pageCounter);

  document.getElementById('pagination').appendChild(div);
  if (params.totalPages === 1) {
    document.getElementById('prev').disabled = true;
    document.getElementById('next').disabled = true;
  }
};

const showNextPage = async () => {
  params.page++;
  const { results } = await searchApiData();
  displaySearchResults(results);

  if (params.page === params.totalPages) {
    document.getElementById('next').disabled = true;
  }
};

const showPrevPage = async () => {
  params.page--;
  const { results } = await searchApiData();
  displaySearchResults(results);

  if (params.page === 1) {
    document.getElementById('prev').disabled = true;
  }
};

const showAlert = (message, className) => {
  const alertEl = document.createElement('div');
  alertEl.className = className;
  alertEl.appendChild(document.createTextNode(message));

  document.getElementById('alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
};

const searchApiData = async () => {
  params.type = searchForm.querySelector('input[name="type"]:checked').value;
  params.searchTerm = searchForm.querySelector('.search-input').value;

  if (params.searchTerm !== '' && params.searchTerm !== null) {
    showSpinner();
    const response = await axios.get('/search', {
      params: {
        type: params.type,
        searchTerm: params.searchTerm,
        page: params.page,
      },
    });

    const data = await response.data.data;

    hideSpinner();

    params.totalResults = data.total_results;
    params.totalPages = data.total_pages;

    return data;
  }
};

export { search, searchInput };

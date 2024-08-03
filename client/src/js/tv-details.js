import Storage from './storage';
import { highlightActiveLink, fetchApiData, clearBody } from '..';
import {
  infoDivBottom,
  clearDetailsContent,
  displayPosterImage,
  displayTitle,
  displayBackgroundOverlay,
  handleBackBtn,
  displayRatings,
  displayReleaseDate,
  displayOverview,
  displayHomepage,
  displayGenres,
  displayProductionCompanies,
} from './movie-details';

// Details Top ----------------
function fillDetailsTopDiv(show) {
  displayPosterImage(show);
  displayTitle(show);
  displayRatings(show);
  displayReleaseDate('show', show);
  displayOverview(show);
  displayGenres(show);
  displayHomepage('Show', show);
}

// Details Bottom -------------
const displayTvShowInfo = (show) => {
  const ul = document.createElement('ul');
  const infos = [
    {
      name: 'TV Provider',
      value: show.networks.map((network) => network.name).join(', '),
    },
    {
      name: 'Episode Length',
      value: show.episode_run_time[0],
    },
    {
      name: 'Seasons',
      value: show.number_of_seasons,
    },
    {
      name: 'Status',
      value: show.status,
    },
  ];

  for (let entry of infos) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'text-secondary';
    span.innerHTML = `<strong class="text-secondary">${entry.name}: </strong>&ensp;`;
    li.appendChild(span);

    switch (entry.name) {
      case 'Episode Length':
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

const fillDetailsBottomDiv = (show) => {
  const h2 = document.createElement('h2');
  h2.innerText = 'Show Info';
  infoDivBottom.appendChild(h2);

  displayTvShowInfo(show);
  displayProductionCompanies(show);
};

// ------------------------
const displayTvShowDetails = async (show) => {
  highlightActiveLink('tv');
  clearBody(['details-section']);
  clearDetailsContent('tv');
  handleBackBtn('tv');

  const detailsShow = await fetchApiData(`tv/${show.id}`);
  displayBackgroundOverlay(detailsShow.backdrop_path);
  fillDetailsTopDiv(detailsShow);
  fillDetailsBottomDiv(detailsShow);

  Storage.setCurrentPage('Tv Show Details');
  Storage.setCurrentContentId(show.id);
};

export { displayTvShowDetails };

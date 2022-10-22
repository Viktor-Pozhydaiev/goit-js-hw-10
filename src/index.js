import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import country from './templates/country.hbs';
import flag from './templates/flag.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  div: document.querySelector('.country-info'),
  list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(changeSearch, DEBOUNCE_DELAY));

function changeSearch(evt) {
  reloadSearch();
  if (!evt.target.value.trim()) {
    return;
  }
  fetchCountries(evt.target.value.trim())
    .then(data => {
      createSearch(data);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createSearch(data) {
  if (data.length > 9) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length > 1 && data.length < 10) {
    refs.list.insertAdjacentHTML('beforeend', flag(data));
  } else if (data.length === 1) {
    refs.div.insertAdjacentHTML('beforeend', country(data));
  }
}

function reloadSearch() {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
}

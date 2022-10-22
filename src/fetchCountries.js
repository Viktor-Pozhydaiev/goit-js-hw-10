const BASE_URL = 'https://restcountries.com/v3.1/';
const ENDPOINT = 'name';
const FILTERS = 'name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${ENDPOINT}/${name}?fields=${FILTERS}`).then(
    response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );
}

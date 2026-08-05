import axios from 'axios';
import { hideLoadMoreButton } from './render-functions';
export let pageQuantity = 1;
export let totalHits = null;
export async function getImagesByQuery(query, page) {
  // hideLoadMoreButton();
  const response = await axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params: {
      key: '53619914-87b740f2b3a0dec47a2b3fec9',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      lang: 'ua',
      page: pageQuantity,
      per_page: 15,
    },
  });
  totalHits = response.data.totalHits;
  return response.data.hits;
}

export function changePageQuantity(newValue) {
  pageQuantity = newValue;
}

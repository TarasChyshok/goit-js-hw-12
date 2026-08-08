import axios from 'axios';
export let pageQuantity = 0;
export let perPageVariable = 15;
export async function getImagesByQuery(query, pageGiven) {
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
      page: pageGiven,
      per_page: perPageVariable,
    },
  });
  pageQuantity = pageGiven;
  return response.data;
}

export function changePerPageQuantity(newValue) {
  perPageVariable = newValue;
}

export function changePageQuantity(newValue) {
  pageQuantity = newValue;
}

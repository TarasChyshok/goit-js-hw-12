import axios from 'axios';
export async function getImagesByQuery(query, page) {
  //api key: 53619914-87b740f2b3a0dec47a2b3fec9
  // if (query) {
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
      // page: '',
      per_page: 9,
    },
  });
  //   .then(response => {
  //   return response.data.hits;
  // });

  return response.data.hits;
}

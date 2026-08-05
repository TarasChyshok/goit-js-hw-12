import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  changePageQuantity,
  getImagesByQuery,
  pageQuantity,
  totalHits,
} from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
  buttonLoadMore,
} from './js/render-functions';

const inputElem = document.querySelector('input[name="search-text"]');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();
  hideLoader();
  // pageQuantity = 1;
  changePageQuantity(1);
  if (inputElem.value == false || inputElem.value.trim() == '') {
    return;
  } else if (inputElem.value !== false) {
    showLoader();
    getImagesByQuery(inputElem.value.trim().toLowerCase())
      .then(hits => {
        try {
          if (hits.length === 0) {
            iziToast.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
              backgroundColor: ' #ef4040;',
            });
          } else {
            showLoadMoreButton();
            createGallery(hits);
          }
        } catch (error) {
          console.log(error);
          return iziToast.error({
            message: `Sorry, here ${error}!`,
            position: 'topRight',
            backgroundColor: ' #ef4040;',
          });
        }
      })
      .finally(() => {
        hideLoader();
      });
  }
});

// buttonLoadMore.addEventListener('click', () => {
//   getImagesByQuery(inputElem.value.trim().toLowerCase());
//   // pageQuantity++;
//   changePageQuantity(pageQuantity + 1);
// });

totalHits.addEventListener('change', () => {
  if (pageQuantity > totalHits / 15) {
    hideLoadMoreButton();
    return iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      backgroundColor: ' #ef4040;',
    });
  }
});

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
} from './js/render-functions';

export const inputElem = document.querySelector('input[name="search-text"]');
const form = document.querySelector('form');
const buttonLoadMore = document.querySelector('.loadMoreButton');
// let hits = null;

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
    hideLoadMoreButton();
    getImagesByQuery(inputElem.value.trim().toLowerCase())
      .then(info => {
        try {
          if (info.hits.length === 0) {
            iziToast.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
              backgroundColor: ' #ef4040;',
            });
          } else {
            showLoadMoreButton();
            createGallery(info.hits);
          }
        } catch (error) {
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

buttonLoadMore.addEventListener('click', () => {
  hideLoadMoreButton();
  changePageQuantity(pageQuantity + 1);
  getImagesByQuery(inputElem.value.trim().toLowerCase())
    .then(info => {
      createGallery(info.hits);
      showLoadMoreButton();
      return info;
    })
    .then(info => {
      if (pageQuantity > Math.round(info.totalHits / 15)) {
        hideLoadMoreButton();
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
          backgroundColor: 'к#6c8cff;',
        });
      }
    });
});

inputElem.addEventListener('input', () => {
  inputElem.style.borderColor = '#4e75ff';
});

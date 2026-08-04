import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const inputElem = document.querySelector('input[name="search-text"]');
const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();
  if (inputElem.value == false || inputElem.value.trim() == '') {
    return;
  } else if (inputElem.value !== false) {
    showLoader();
    getImagesByQuery(inputElem.value.trim().toLowerCase())
      .then(hits => {
        if (hits.length === 0) {
          iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            backgroundColor: ' #ef4040;',
          });
        } else {
          // hideLoader();
          return createGallery(hits);
          // lightbox.refresh();}
        }
      })
      .catch(error => {
        return iziToast.error({
          message: `Sorry, here ${error}!`,
          position: 'topRight',
          backgroundColor: ' #ef4040;',
        });
      })
      .finally(() => {
        hideLoader();
      });
  }
});

console.log(getImagesByQuery(inputElem.value.trim().toLowerCase()));

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  // changePageQuantity,
  getImagesByQuery,
  perPageVariable,
  pageQuantity,
  changePerPageQuantity,
  changePageQuantity,
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

form.addEventListener('submit', e => {
  e.preventDefault();
  async function searchNewRequestImages() {
    clearGallery();
    hideLoader();
    // pageQuantity = 1;
    if (inputElem.value.trim() == '') {
      return;
    } else if (inputElem.value !== false) {
      showLoader();
      hideLoadMoreButton();
      try {
        changePageQuantity(1);
        const info = await getImagesByQuery(
          inputElem.value.trim().toLowerCase(),
          1
        );
        if (info.hits.length === 0) {
          return iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            backgroundColor: ' #ef4040;',
          });
        } else if (
          pageQuantity > Math.round(info.totalHits / perPageVariable)
        ) {
          hideLoadMoreButton();
          iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight',
            backgroundColor: '#6c8cff;',
          });
        } else {
          showLoadMoreButton();
          createGallery(info.hits);
        }
      } catch (error) {
        iziToast.error({
          message: `Sorry, here ${error}!`,
          position: 'topRight',
          backgroundColor: ' #ef4040;',
        });
      }
      hideLoader();
    }
  }
  searchNewRequestImages();
});

buttonLoadMore.addEventListener('click', () => {
  async function getMoreImgByButton() {
    try {
      hideLoadMoreButton();
      showLoader();
      changePageQuantity(pageQuantity + 1);
      // changePerPageQuantity(pageQuantity + 1);
      const info = await getImagesByQuery(
        inputElem.value.trim().toLowerCase(),
        pageQuantity
      );
      if (pageQuantity > Math.ceil(info.totalHits / perPageVariable)) {
        //infoV, totalHitsVariable
        hideLoadMoreButton();
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
          backgroundColor: '#6c8cff;',
        });
      } else {
        createGallery(info.hits);
        hideLoader();
        if (pageQuantity > 1) {
          const elemLiImg = document.querySelector('li.item-gallery'); //обчислюємо перший нововкладений елемент після створення галереї на основі кількості елементів що відмальовуються з бекенда.
          console.log(elemLiImg.getBoundingClientRect());
          const heightOfElem = elemLiImg.getBoundingClientRect().height;
          let quantityOfPixels = heightOfElem * 2;
          window.scrollBy({ top: quantityOfPixels, behavior: 'smooth' });
        }
        showLoadMoreButton();
      }
    } catch (error) {
      return iziToast.error({
        message: `Sorry, here ${error}!`,
        position: 'topRight',
        backgroundColor: ' #ef4040;',
      });
    }
  }
  getMoreImgByButton();
});

inputElem.addEventListener('input', () => {
  inputElem.style.borderColor = '#4e75ff';
});

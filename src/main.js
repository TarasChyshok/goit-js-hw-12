import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
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
let infoV = null;

form.addEventListener('submit', e => {
  e.preventDefault();
  async function searchNewRequestImages() {
    clearGallery();
    hideLoader();
    if (inputElem.value.trim() == '') {
      return;
    } else if (inputElem.value !== false) {
      showLoader();
      hideLoadMoreButton();
      try {
        const info = await getImagesByQuery(
          inputElem.value.trim().toLowerCase(),
          changePageQuantity(1)
        );
        infoV = info;
        if (info.hits.length === 0 && info.totalHits === 0) {
          iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            backgroundColor: ' #ef4040;',
          });
        } else if (pageQuantity > Math.ceil(info.totalHits / perPageVariable)) {
          hideLoadMoreButton();
          iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight',
            backgroundColor: '#6c8cff;',
          });
          if (info.totalHits <= perPageVariable) {
            createGallery(info.hits);
          }
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
      // hideLoadMoreButton();
      //перевірка за останніми результатами попереднього запиту.
      showLoader();
      // changePerPageQuantity(pageQuantity + 1);
      if (pageQuantity > Math.ceil(infoV.totalHits / perPageVariable)) {
        hideLoadMoreButton();
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
          backgroundColor: '#6c8cff;',
        });
      } else {
        const info = await getImagesByQuery(
          inputElem.value.trim().toLowerCase(),
          pageQuantity
        );
        changePageQuantity(pageQuantity + 1);
        createGallery(info.hits);
        if (pageQuantity > 1) {
          const elemLiImg = document.querySelector('li.item-gallery'); //обчислюємо перший нововкладений елемент після створення галереї на основі кількості елементів що відмальовуються з бекенда.
          const heightOfElem = elemLiImg.getBoundingClientRect().height;
          let quantityOfPixels = heightOfElem * 2;
          window.scrollBy({ top: quantityOfPixels, behavior: 'smooth' });
          showLoadMoreButton();
        }
        hideLoader();
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
  getMoreImgByButton();
});

inputElem.addEventListener('input', () => {
  inputElem.style.borderColor = '#4e75ff';
});

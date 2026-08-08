// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { pageQuantity } from './pixabay-api';
export const buttonLoadMore = document.querySelector('.loadMoreButton');

export const lightbox = new SimpleLightbox('ul.gallery a.a-item', {
  nav: true,
  captions: true,
  captionsData: 'alt',
  captionsPosition: 'bottom',
  captionType: 'attr',
  sourceAttr: 'href',
  overlay: true,
  captionSelector: 'img',
  captionDelay: 250,
});
export const galleryUl = document.querySelector('ul.gallery');

export function createGallery(images) {
  const galleryMarkup = images.map(element => {
    return `<li class="item-gallery">
                <a href="${element.largeImageURL}" class="a-item">
                  <img
                    class="img-gallery"
                    src="${element.webformatURL}" data-likes='${element.likes}' data-view='${element.views}' data-comments='${element.comments}' data-downloads='${element.downloads}' data-source="${element.largeImageURL}" alt="${element.tags}"
                  />
                </a>
                <ul class='info'>
                  <li>Likes <span class='info-span'>${element.likes}</span></li>
                  <li>Views <span class="info-span">${element.views}</span></li>
                  <li>Comments <span class="info-span">${element.comments}</span></li>
                  <li>Downloads <span class="info-span">${element.downloads}</span></li>
                </ul>
              </li>`;
  });

  galleryUl.insertAdjacentHTML('beforeend', galleryMarkup.join(''));
  lightbox.refresh();
}
export function clearGallery() {
  if (galleryUl) {
    galleryUl.innerHTML = '';
  }
}
export function showLoader() {
  // document
  //   .querySelector('form')
  //   .insertAdjacentHTML('afterend', '<span class="loader"></span>');
  const span = document.querySelector('span.loader');
  if (!span) {
    let spanCrEl = "<span class='loader showLoader'></span>";
    document.querySelector('form').insertAdjacentHTML('afterend', spanCrEl);
  } else if (span) {
    span.classList.add('showLoader');
  }
}
export function hideLoader() {
  // document.querySelector('form').insertAdjacentHTML('afterend', '');
  const span = document.querySelector('span.loader');
  if (span && span.classList.contains('showLoader')) {
    span.classList.remove('showLoader');
  }
}

export function showLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.loadMoreButton');
  if (
    buttonLoadMore &&
    !buttonLoadMore.classList.contains('showLoadMoreButton')
  ) {
    buttonLoadMore.classList.add('showLoadMoreButton');
    //додати клас на лоадмор
  }
}

export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.loadMoreButton');
  if (
    buttonLoadMore &&
    buttonLoadMore.classList.contains('showLoadMoreButton')
  ) {
    buttonLoadMore.classList.remove('showLoadMoreButton');
  }
}
//splghtbx

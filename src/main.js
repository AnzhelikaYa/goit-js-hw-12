import { getImagesByQuery, PER_PAGE } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refs,
} from "./js/render-functions.js";

import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");
const { loadMoreBtn, galleryContainer } = refs;

let currentQuery = "";
let page = 1;
let totalHits = 0;

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

 
  currentQuery = query;
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    totalHits = data.totalHits ?? 0;

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: "No Results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(data.hits);

   
    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits && data.hits.length > 0) {
      createGallery(data.hits);

      const firstCard = galleryContainer.querySelector(".gallery-item");
      if (firstCard) {
        const { height } = firstCard.getBoundingClientRect();
    
        window.scrollBy({
          top: height * 2,
          behavior: "smooth",
        });
      }
    }


    if (page * PER_PAGE >= (data.totalHits ?? totalHits)) {
      hideLoadMoreButton();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

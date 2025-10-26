import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader"); 
const loadMoreBtn = document.querySelector(".load-more");


const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  
  const markup = images
    .map(
      (img) => `
    <a href="${img.largeImageURL}" class="gallery-item">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      <div class="info">
        <p class="info-txt"><b>Likes:</b> ${img.likes}</p>
        <p class="info-txt"><b>Views:</b> ${img.views}</p>
        <p class="info-txt"><b>Comments:</b> ${img.comments}</p>
        <p class="info-txt"><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </a>`
    )
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("visible");
}

export function hideLoader() {
  loader.classList.remove("visible");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove("visible");
}


export const refs = {
  galleryContainer,
  loadMoreBtn,
  loader,
};

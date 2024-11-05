import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from "./js/render-functions";
import { fetchImages } from "./js/pixabay-api"; 
import { scrollingTopPage } from "./js/scrolling";

const searchForm = document.querySelector('.js-search');
const imageGallery = document.querySelector('.gallery');
const loadingSpinner = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.btn-load');
const loadingMoreSpinner = document.querySelector('.loader-more');
const endOfResults = document.querySelector('.end-loader');

let currentPageNumber = 1;
const imagesPerPage = 15;  
let searchQuery = '';
let lightboxInstance;

loadingSpinner.style.display = 'none';
loadingMoreSpinner.style.display = 'none';
loadMoreButton.style.display = 'none';
endOfResults.style.display = 'none';

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreButton.addEventListener('click', onLoadMoreImages);

scrollingTopPage();

async function onSearchSubmit(event) {
    event.preventDefault();

    currentPageNumber = 1;
    imageGallery.innerHTML = '';
    loadingSpinner.style.display = 'block';
    loadMoreButton.style.display = 'none';
    endOfResults.style.display = 'none';

    searchQuery = event.target.elements.search.value.trim();

    if (!searchQuery) {
        iziToast.warning({
            title: 'Caution',
            message: 'Sorry, but you did not fill out the field!',
        });
        loadingSpinner.style.display = 'none';
        return;
    }

    try {
        const data = await fetchImages(searchQuery, currentPageNumber);
        loadingSpinner.style.display = 'none';

        if (!data || typeof data.totalHits === 'undefined' || !data.hits) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

        const totalPages = Math.ceil(data.totalHits / imagesPerPage); 

        if (currentPageNumber >= totalPages) {
            loadMoreButton.style.display = 'none';
            endOfResults.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'block';
        }

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

        imageGallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));

        iziToast.success({
            title: 'Wow',
            message: `We found ${data.totalHits} pictures!`,
        });

        lightboxInstance = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
        }).refresh();

        searchForm.reset();
    } catch (err) {
        loadingSpinner.style.display = 'none';
        console.error(err);
        iziToast.error({
            title: 'Error',
            message: 'An unexpected error occurred. Please try again.',
        });
    }
}

async function onLoadMoreImages() {
    currentPageNumber += 1;

    loadingMoreSpinner.style.display = 'block';
    loadMoreButton.style.display = 'none';
    endOfResults.style.display = 'none';

    try {
        const data = await fetchImages(searchQuery, currentPageNumber);
        loadingMoreSpinner.style.display = 'none';

        if (!data || typeof data.totalHits === 'undefined' || !data.hits) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, no more images to load.',
            });
            return;
        }

        
        imageGallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));

        const totalPages = Math.ceil(data.totalHits / imagesPerPage); 
        if (currentPageNumber >= totalPages) {
            iziToast.info({
                title: 'Caution',
                message: `You've reached the end of the collection.`,
            });
            loadMoreButton.style.display = 'none';
            endOfResults.style.display = 'block';  
        } else {
            loadMoreButton.style.display = 'block';
        }

        const getHeightOfImageCard = () => document.querySelector('.gallery-item').getBoundingClientRect();
        window.scrollBy({
            top: getHeightOfImageCard().height * 2,
            left: 0,
            behavior: "smooth",
        });

        lightboxInstance.refresh();
    } catch (error) {
        loadingMoreSpinner.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: 'An unexpected error occurred. Please try again.',
        });
        console.error('Error in onLoadMoreImages:', error);
    }
}


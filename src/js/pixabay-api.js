import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export { fetchImages };

const imagesPerPage = 15; 

async function fetchImages(query, pageNum) {
    const API_KEY = '46767628-a1a0fbec2a5b02d371c47f484';

    try {
        const encodedQuery = encodeURIComponent(query);

        const apiResponse = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: API_KEY,
                q: encodedQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: pageNum,
                per_page: imagesPerPage,
            }
        });

        
       if (apiResponse.data && apiResponse.data.hits) {
            const totalHits = apiResponse.data.totalHits; 
            const currentHits = apiResponse.data.hits.length; 

           
            return { 
                hits: apiResponse.data.hits, 
                totalHits: totalHits, 
                currentHits: currentHits 
            };
        } else {
            console.error('No hits found.');
            return { totalHits: 0, hits: [], currentHits: 0 }; 
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry! The site is currently unavailable. Please try later!',
        });
        console.error('Error message:', error.message); 
        return { totalHits: 0, hits: [], currentHits: 0 }; 
    }
}
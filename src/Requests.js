


const key = import.meta.env.VITE_TMDB_API_KEY
const base_url = 'https://api.themoviedb.org/3/'
export const img_originial = 'https://image.tmdb.org/t/p/original'
export const img_500 = 'https://image.tmdb.org/t/p/500'


const options = {
    method: 'GET',
    url: `${base_url}`,
    params: {
        language: 'en-US',
        api_key: key, // Include your API key as a query parameter
    },
    headers: {
        accept: 'application/json',
    }
};




const requests = {

    popular: { ...options, url: `${options.url}movie/popular` },
    topRated: { ...options, url: `${options.url}/movie/top_rated` },
    trending: { ...options, url: `${options.url}trending/all/week` },
    horror: {
        ...options, params: { ...options.params, query: 'horror' }, url: `${options.url}search/movie`
    },
    upcoming: { ...options, url: `${options.url}movie/upcoming` },
    search: {
        ...options, params: { ...options.params, query: '' }, url: `${options.url}search/movie`
    },

    details: { ...options, params: { ...options.params, append_to_response: 'videos,similar,keywords,credits,recommendations,images' }, url: `${options.url}movie/` }

}


// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/movie/11',
//   params: {
//     append_to_response: 'videos%2Csimilar%2Ckeywords%2Ccredits%2Crecommendations%2Cimages',
//     language: 'en-US'
//   },
//   headers: {
//     accept: 'application/json',
//   }
// }

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });






export { requests, key }
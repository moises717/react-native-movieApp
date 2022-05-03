import axios from 'axios';

const movieDb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
  params: {
    api_key: 'cbad11bb22027a4279348aa883abb189',
    language: 'es-ES',
  },
});

export default movieDb;

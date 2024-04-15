import axios from "axios";
import { baseURL } from "./authService";

// PETICIONES PARA PELICULAS 
export const GetMovies = async () => axios.get(`${baseURL}/v1/peliculas`);

export const GetMovieGenres = async (id) => axios.get(`${baseURL}/v1/peliculas_generos/?pelicula_id=${id}`);

export const GetMovieProducer = async (id) => axios.get(`${baseURL}/v1/peliculas_productoras/?pelicula_id=${id}`);

export const GetMovieDirector = async (id) => axios.get(`${baseURL}/v1/peliculas_directores/?pelicula_id=${id}`);

export const GetMovieActors = async (id) => axios.get(`${baseURL}/v1/peliculas_actores/?pelicula_id=${id}`);

export const GetMovieProviders = async (id) => axios.get(`${baseURL}/v1/peliculas_provedores/?pelicula_id=${id}`);

// PETICIONES PARA GENEROS
export const GetGenres = async () => axios.get(`${baseURL}/v1/generos`);

export const GetGenreMovies = async (id) => axios.get(`${baseURL}/v1/peliculas_generos/?genero_id=${id}`);

//PETICIONES PARA DIRECTORES
export const GetDirectors = async () => axios.get(`${baseURL}/v1/directores`);

export const GetDirectorMovies = async (id) => axios.get(`${baseURL}/v1/peliculas_directores/?director_id=${id}`);

//PETICIONES PARA PRODUCTORAS
export const GetProducers = async () => axios.get(`${baseURL}/v1/productoras`);

export const GetProducerMovies = async (id) => axios.get(`${baseURL}/v1/peliculas_productoras/?productora_id=${id}`);

// PETICIONES PARA FAVORITOS
export const GetFavoriteMovies = async (id) => axios.get(`${baseURL}/v1/peliculas_f/?usuario_id=${id}`);

export const GetFavoriteGenres = async (id) => axios.get(`${baseURL}/v1/generos_f/?usuario_id=${id}`);

export const GetFavoriteDirectors = async (id) => axios.get(`${baseURL}/v1/directores_f/?usuario_id=${id}`);

export const GetFavoriteProducers = async (id) => axios.get(`${baseURL}/v1/productoras_f/?usuario_id=${id}`);

export const AddFavoriteDirectors = async (datos) => axios.post(`${baseURL}/v1/directores_f/`, datos);
export const DelFavoriteDirectors = async (id) => axios.delete(`${baseURL}/v1/directores_f/${id}/`);

export const AddFavoriteMovies = async (datos) => axios.post(`${baseURL}/v1/peliculas_f/`, datos);
export const DelFavoriteMovies = async (id) => axios.delete(`${baseURL}/v1/peliculas_f/${id}/`);

export const AddFavoriteGenres = async (datos) => axios.post(`${baseURL}/v1/generos_f/`, datos);
export const DelFavoriteGenres = async (id) => axios.delete(`${baseURL}/v1/generos_f/${id}/`);

export const AddFavoriteProducers = async (datos) => axios.post(`${baseURL}/v1/productoras_f/`, datos);
export const DelFavoriteProducers = async (id) => axios.delete(`${baseURL}/v1/productoras_f/${id}/`);

//PETICION PARA RATINGS
export const AddReview = async (datos) => axios.post(`${baseURL}/v1/rating/`, datos);
export const GetReview = async (id) => axios.get(`${baseURL}/v1/rating/?usuario_id=${id}`);

//PETICIONES PARA RECOMENDACIONES
export const GetRecomendationMovies = async (id) => axios.get(`${baseURL}/recomendaciones/${id}`);

export const GetRecomendationGenres = async (id,idg) => axios.get(`${baseURL}/recomendacionesByGenero/${id}/?genero_id=${idg}`);

export const GetRecomendationProviders = async (id) => axios.get(`${baseURL}/recomendacionesByProvedores/${id}`);


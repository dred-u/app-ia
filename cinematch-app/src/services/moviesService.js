import axios from "axios";
import { baseURL } from "./authService";

// PETICIONES PARA PELICULAS 
export const GetMovies = async () => axios.get(`${baseURL}/v1/peliculas`);

export const GetMovieGenres = async (id) => axios.get(`${baseURL}/peliculas_generos/${id}`);

export const GetMovieProducer = async (id) => axios.get(`${baseURL}/productoras_favoritas/${id}`);

export const GetMovieActors = async (id) => axios.get(`${baseURL}/peliculas_actores/${id}`);

export const GetMovieProviders = async (id) => axios.get(`${baseURL}/peliculas_provedores/${id}`);

// PETICIONES PARA GENEROS
export const GetGenres = async () => axios.get(`${baseURL}/v1/generos`);

export const GetGenreMovies = async (id) => axios.get(`${baseURL}/generos_peliculas/${id}`);

//PETICIONES PARA DIRECTORES
export const GetDirectors = async () => axios.get(`${baseURL}/v1/directores`);

export const GetDirectorMovies = async (id) => axios.get(`${baseURL}/directores_peliculas/${id}`);

// PETICIONES PARA FAVORITOS
export const GetFavoriteMovies = async (id) => axios.get(`${baseURL}/peliculas_favoritas/${id}`);

export const GetFavoriteGenres = async (id) => axios.get(`${baseURL}/generos_favoritos/${id}`);

export const GetFavoriteDirectors = async (id) => axios.get(`${baseURL}/directores_favoritos/${id}`);

export const AddFavoriteDirectors = async (datos) => axios.post(`${baseURL}/add_director_favorito/`, datos);
export const DelFavoriteDirectors = async (id) => axios.delete(`${baseURL}/eliminar_director_favorito/${id}`);

export const AddFavoriteMovies = async (datos) => axios.post(`${baseURL}/add_pelicula_favorita/`, datos);
export const DelFavoriteMovies = async (id) => axios.delete(`${baseURL}/eliminar_pelicula_favorita/${id}`);

export const AddFavoriteGenres = async (datos) => axios.post(`${baseURL}/add_genero_favorito/`, datos);
export const DelFavoriteGenres = async (id) => axios.delete(`${baseURL}/eliminar_genero_favorito/${id}`);
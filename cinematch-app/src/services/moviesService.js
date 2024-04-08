import axios from "axios";
import { baseURL } from "./authService";

export const getMovies = async () => axios.get(`${baseURL}/v1/peliculas`);

export const getFavoriteMovies = async (id) => axios.get(`${baseURL}/peliculas_favoritas/${id}`);

export const getMovieGenres = async (id) => axios.get(`${baseURL}/peliculas_generos/${id}`);

export const getMovieProducer = async (id) => axios.get(`${baseURL}/productoras_favoritas/${id}`);

export const getMovieActors = async (id) => axios.get(`${baseURL}/peliculas_actores/${id}`);

export const getMovieProviders = async (id) => axios.get(`${baseURL}/peliculas_provedores/${id}`);



import { createContext, useState, useContext, useEffect } from "react";
import { GetMovies, GetMovieGenres, GetMovieProviders, 
         GetGenres, GetGenreMovies,
         GetDirectors,GetDirectorMovies,
         GetFavoriteMovies,GetFavoriteDirectors, GetFavoriteGenres,
         AddFavoriteGenres, AddFavoriteMovies, AddFavoriteDirectors,
         DelFavoriteGenres, DelFavoriteMovies, DelFavoriteDirectors
} from "./services/moviesService";
import { useAuth } from './authContext';

export const MoviesContext = createContext()

export const useMovies = () => {
    const context = useContext(MoviesContext)
    if (!context) {
        throw new Error("useMovies debe usarse dentro de AuthProvider");
    }
    return context;
};

//PETICIONES PARA PELICULAS
export const MoviesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth(); 
    const [movies, setMovies] = useState(null);
    const [genres, setGenres] = useState(null);
    const [directors, setDirectors] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState(null);
    const [favoriteGenres, setFavoriteGenres] = useState(null);
    const [favoriteDirectors, setFavoriteDirectors] = useState(null);

//PETICIONES PARA PELICULAS
    const getMovieList = async () => {
        try {
            const res = await GetMovies();
            setMovies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getGenres = async (id) => {
        try {
            const res = await GetMovieGenres(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

    const getProviders = async (id) => {
        try {
            const res = await GetMovieProviders(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

//PETICIONES PARA GENEROS
    const getGenreList = async () => {
        try {
            const res = await GetGenres();
            setGenres(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getGenMovies = async (id) => {
        try {
            const res = await GetGenreMovies(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

//PETICIONES PARA GENEROS
    const getDirectorList = async () => {
        try {
            const res = await GetDirectors();
            setDirectors(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getDirMovies = async (id) => {
        try {
            const res = await GetDirectorMovies(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };

//PETICIONES PARA FAVORITAS
    const getFavoriteMovieList = async (id) => {
        try {
            const res = await GetFavoriteMovies(id);
            const moviesArray = res.data.map(item => item.pelicula);
            setFavoriteMovies(moviesArray);
        } catch (error) {
            console.log(error);
        }
    };

    const getFavoriteGenresList = async (id) => {
        try {
            const res = await GetFavoriteGenres(id);
            const genresArray = res.data.map(item => item.genero);
            setFavoriteGenres(genresArray);
        } catch (error) {
            console.log(error);
        }
    };

    const getFavoriteDirectorsList = async (id) => {
        try {
            const res = await GetFavoriteDirectors(id);
            const directorsArray = res.data.map(item => item.director);
            setFavoriteDirectors(directorsArray);
        } catch (error) {
            console.log(error);
        }
    };

    const addFavMovie = async (datos) => {
        try {
            const res = await AddFavoriteMovies(datos);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    const addFavGenre = async (datos) => {
        try {
            const res = await AddFavoriteGenres(datos);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    const addFavDirector = async (datos) => {
        try {
            const res = await AddFavoriteDirectors(datos);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    const delFavMovie = async (id) => {
        try {
            const res = await DelFavoriteMovies(id);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    const delFavGenre = async (id) => {
        try {
            const res = await DelFavoriteGenres(id);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    const delFavDirector = async (id) => {
        try {
            const res = await DelFavoriteDirectors(id);
            return res
        } catch (error) {
            console.log(error);
        }
    };

    // Cargar datos de usuario al iniciar la aplicación
    useEffect(() => {
        getMovieList()
        getGenreList()
        getDirectorList()
    }, []);

    useEffect(() => {
        if(isAuthenticated == true){
            getFavoriteMovieList(user.id)
            getFavoriteGenresList(user.id)
            getFavoriteDirectorsList(user.id)
        }
    },[isAuthenticated])

    return (
        <MoviesContext.Provider value={{
            getMovieList,
            getGenres,
            getProviders,
            getGenreList,
            getGenMovies,
            getDirectorList,
            getDirMovies,
            movies,
            genres,
            directors,
            getFavoriteMovieList,
            getFavoriteGenresList,
            getFavoriteDirectorsList,
            favoriteMovies,
            favoriteGenres,
            favoriteDirectors,
            addFavMovie,
            addFavGenre,
            addFavDirector,
            delFavMovie,
            delFavGenre,
            delFavDirector,
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
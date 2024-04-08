import { createContext, useState, useContext, useEffect } from "react";
import { GetMovies, 
         GetMovieGenres, 
         GetMovieProviders, 
         GetGenres, 
         GetGenreMovies,
         GetDirectors,
         GetDirectorMovies
} from "./services/moviesService";

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
    const [movies, setMovies] = useState(null);
    const [genres, setGenres] = useState(null);
    const [directors, setDirectors] = useState(null);

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

    // Cargar datos de usuario al iniciar la aplicación
    useEffect(() => {
        getMovieList()
        getGenreList()
        getDirectorList()
        console.log(movies);
        console.log(genres);
    }, []);


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
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
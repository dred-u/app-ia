import { createContext, useState, useContext, useEffect } from "react";
import { getMovies, getFavoriteMovies, getMovieGenres, getMovieProviders } from "./services/moviesService";

export const MoviesContext = createContext()

export const useMovies = () => {
    const context = useContext(MoviesContext)
    if (!context){
        throw new Error("useMovies debe usarse dentro de AuthProvider");
    }
    return context;
};

export const MoviesProvider = ({children}) => {
    const [movies, setMovies] = useState(null);

    const getMovieList = async () => {
        try {
            const res = await getMovies();
            setMovies(res.data);
        }catch (error) {
            console.log(error);
        }
    };

    const getGenres = async (id) => {
        try {
            const res = await getMovieGenres(id);
            return res.data
        }catch (error) {
            console.log(error);
        }
    };

    // Cargar datos de usuario al iniciar la aplicación
    useEffect(() => {
        getMovieList()
        console.log(movies);
    }, []);


    return (
     <MoviesContext.Provider value={{
        getMovieList,
        getGenres,
        movies
     }}>
        {children}
     </MoviesContext.Provider>   
    )
}
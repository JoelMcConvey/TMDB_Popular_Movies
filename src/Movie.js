// React
import { useEffect, useState } from 'react';

// Animation
import { motion } from 'framer-motion';

// Images
import movieReel from './assets/movie-reel.jpeg';

function Movie({ movie, setOpenModal }) {
    let API_KEY = 'acbbe4ba500901ee5f54888a4ac2b6c0';
    const [movieLinks, setMovieLinks] = useState([]);

    useEffect(() => {
        const getMovieLinks = async () => {
            const url = 'https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + API_KEY + '&language=en-US';

            try {
                const resp = await fetch(url);
                const data = await resp.json();
                setMovieLinks(data.homepage);
            } catch (err) {
                console.error(err);
            }
        }

        getMovieLinks();
    }, [API_KEY, movie.id]);

    const handleClick = (e) => {
        if(!movieLinks){
            e.preventDefault();
            setOpenModal(true);
        }
    }

    return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} layout>
            <a onClick={handleClick} href={movieLinks} target="_blank" rel="noreferrer">
                <div className="movie-card" id={movie.id}>
                    <h2>{movie.title}</h2>
                    <p className="movie-overview">{movie.overview}</p>
                    <img className="movie-img" src={movie.backdrop_path !== null ? "https://image.tmdb.org/t/p/w500" + movie.backdrop_path : movieReel} alt={movie.title} />
                    <p className="movie-release">Release Date: {movie.release_date}</p>
                </div>
            </a>
        </motion.div>
    )
}

export default Movie;
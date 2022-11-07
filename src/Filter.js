// React
import { useEffect } from "react";

// Animation
import { motion } from 'framer-motion';

function Filter({ setActiveGenre, activeGenre, setFiltered, popular }) {

    useEffect(() => {
        // All Movies
        if (activeGenre === 0) {
            setFiltered(popular);
            return;
        }
        // Filters
        const filtered = popular.filter((movie) => movie.genre_ids.includes(activeGenre));
        setFiltered(filtered);
    }, [activeGenre])

    return (
        <div className="filter-container">
            <motion.button className={activeGenre === 0 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(0)}>All</motion.button>
            <motion.button className={activeGenre === 28 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(28)}>Action</motion.button>
            <motion.button className={activeGenre === 12 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}onClick={() => setActiveGenre(12)}>Adventure</motion.button>
            <motion.button className={activeGenre === 35 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(35)}>Comedy</motion.button>
            <motion.button className={activeGenre === 10751 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(10751)}>Family</motion.button>
            <motion.button className={activeGenre === 27 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(27)}>Horror</motion.button>
            <motion.button className={activeGenre === 878 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(878)}>Sci-Fi</motion.button>
            <motion.button className={activeGenre === 53 ? "active" : ''} whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} onClick={() => setActiveGenre(53)}>Thriller</motion.button>
        </div>
    )
}

export default Filter;

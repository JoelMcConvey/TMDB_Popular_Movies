// React
import { useEffect, useState } from 'react';

//Styles
import './App.css';

//Elements
import Movie from './Movie';
import Filter from './Filter';
import Modal from './Modal';

// Animation
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// Assets
import TMDB from './assets/tmdb.svg';

function App() {
  let API_KEY = 'acbbe4ba500901ee5f54888a4ac2b6c0';
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [offsetNum, setOffsetNum] = useState(0);
  const [query, setQuery] = useState(1);
  const [morePages, setMorePages] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchPopular();
  }, [offsetNum, query]);

  const nextPage = () => {
    if (morePages) {
      setActiveGenre(0);
      setQuery(query + 1);
      setOffsetNum(offsetNum + 20);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (offsetNum !== 0) {
      setActiveGenre(0);
      setQuery(query - 1);
      setOffsetNum(offsetNum - 20);
      window.scrollTo(0, 0);
    }
  };

  const fetchPopular = async () => {
    const dataset = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=' + query);
    const movies = await dataset.json();
    setPopular(movies.results);
    setFiltered(movies.results);
    setMorePages(movies.total_pages > movies.page);
  }

  return (
    <div className="App">
      <h1 className="header">TMDB's Most Popular Movies</h1>
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <Modal
          open={openModal}
          onClose={() => setOpenModal(false)} />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          <LayoutGroup>
            {filtered.map(movie => {
              return <Movie key={movie.id} movie={movie} setOpenModal={setOpenModal} filtered={filtered}/>;
            })}
          </LayoutGroup>
        </AnimatePresence>
      </motion.div>
      <footer>
        <div className="pagination-btns">
          {offsetNum !== 0 && (
            <motion.button className="prev-page-btn" onClick={prevPage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <span role="img">&#10094;</span> Previous Page
            </motion.button>
          )}
          {morePages && (
            <motion.button className="next-page-btn" onClick={nextPage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Next Page <span role="img">&#10095;</span>
            </motion.button>
          )}
        </div>
      </footer>
      <div className="attribution">
        <p>Data Courtesy of</p>
        <a href="https://www.themoviedb.org/?language=en-GB">
          <img className="tmdb" src={TMDB} alt="TMDB Logo" />
        </a>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendMovies } from '../services/apiServices';

import s from '../components/Navigation/Navigation.module.css';


const HomePage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendMovies().then(setMovies);
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <>
      <h1 className={s.title}>Trending today</h1>

      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li className={s.list} key={id} >
              <Link className={s.list_item}
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: location,
                  },
                }} 
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomePage;

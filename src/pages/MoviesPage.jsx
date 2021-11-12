import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchMoviesByQuery } from '../services/apiServices';
import s from '../components/Cast/Cast.module.css';

const MoviesPage = () => {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const value = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (search === '') {
      return;
    }

    fetchMoviesByQuery(value).then(setMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query === '') {
      return;
    }

    history.push({ ...location, search: `query=${query}` });
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
        className={s.searchFormInput}
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />

        <button type="submit" className={s.searchFormButton}>Search</button>
      </form>

      {movies && (
        <ul>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${pathname}/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt={title}
                />
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesPage;

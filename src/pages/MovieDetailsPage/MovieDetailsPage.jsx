import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/apiServices';
import Loader from '../../components/Loader';
import s from '../../components/Navigation/Navigation.module.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const {
    url,
    params: { movieId },
  } = useRouteMatch();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    history.push({
      pathname: state?.from?.pathname ?? '/movies',
    });

    if (state?.from?.pathname !== '/') {
      history.push({
        search: state?.from?.search ?? '',
      });
    }
  };

  return (
    <>
      <button className={s.btn} type="button" onClick={handleGoBack}>
        Go back
      </button>

      {movie && (
        <section className={s.section}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.details}>
            <h1 className={s.title_info}>{movie.title}</h1>
            <p className={s.rank}>User Score: {movie.vote_average * 10}%</p>
            <p className={s.subtitle}>Overview</p>
            <p className={s.text}>{movie.overview}</p>
            <p className={s.subtitle}>Genres:</p>
            <div className={s.genres}>
              {movie.genres.map(({ id, name }) => (
                <p className={s.info_list} key={id}>
                  {name}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
      <h2 className={s.subtitle}>Additional information</h2>
      <NavLink
        className={s.link_info}
        to={{
          pathname: `${url}/cast`,
          state: {
            from: {
              pathname: state?.from?.pathname,
              search: state?.from?.search,
            },
          },
        }}
      >
        Cast
      </NavLink>
      <NavLink
        className={s.link_info}
        to={{
          pathname: `${url}/reviews`,
          state: {
            from: {
              pathname: state?.from?.pathname,
              search: state?.from?.search,
            },
          },
        }}
      >
        Reviews
      </NavLink>
      <Suspense fallback={<Loader />}>
        
          <Route 
            path={`${url}/cast`}
            render={() => <Cast movieId={movieId} />}
          ></Route>
          <Route 
            path={`${url}/reviews`}
            render={() => <Reviews movieId={movieId} />}
          ></Route>
       
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;

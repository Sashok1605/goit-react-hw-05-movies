import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from './components/Container/Container';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';
import './App.css';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

export default function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route  path="/movies/:movieId" component={MovieDetailsPage}/>
          <Route  path="/movies" component={MoviesPage}/>
          <Redirect to='/'/>
        </Switch>
      </Suspense>
    </Container>
  );
}

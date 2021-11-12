import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
// import PropTypes from 'prop-types';

const Navigation = () => {
  return (
    <nav className={s.navigation}>
      <NavLink className={s.link} activeStyle={{ color: "red" }} exact to="/">
        Home
      </NavLink>
      <NavLink className={s.link} activeStyle={{ color: "red" }} to="/movies">Movies</NavLink>
    </nav>
  );
}

export default Navigation;

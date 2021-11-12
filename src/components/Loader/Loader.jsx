import React, { Component } from 'react';
import Spinner from 'react-loader-spinner';
import s from './Loader.module.css'

class Loader extends Component {
  render() {
    return (
      <Spinner className={s.loader} timeout={4000} type="ThreeDots" color="#E53535" height={100} width={200} />
    );
  }
}

export default Loader;

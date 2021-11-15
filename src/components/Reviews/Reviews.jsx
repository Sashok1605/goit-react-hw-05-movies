import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../services/apiServices';
import PropTypes from 'prop-types';
const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie 🙁</p>
      )}
    </>
  );
}

Reviews.prototype = {
  movieId : PropTypes.string.isRequired
}

export default Reviews;

import { useState, useEffect } from 'react';
import { fetchActorsCast } from '../../services/apiServices';


const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchActorsCast(movieId).then(setCast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cast.length > 0 ? (
        <ul >
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt={name}
                />
              ) : (
                <img
                  src={
                    'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'
                  }
                  alt={name}
                  width="200"
                />
              )}
              <p>{name}</p>
              <p>
                <span>Character: </span>
                {character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any information about cast for this movie 🙁</p>
      )}
    </>
  );
}

export default Cast;

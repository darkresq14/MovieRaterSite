import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from './hooks/useFetch';

function App() {

  // hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data])

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
  }, [token]);

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const updateMovie = movie => {
    setMovies(movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    }))
  }

  const newMovie = () => {
    setEditedMovie({ title: '', description: '' });
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    setMovies([...movies, movie])
  }

  const removeClicked = movie => {
    setMovies(movies.filter(mov => mov.id !== movie.id))
  }

  const logoutUser = () => {
    deleteToken('mr-token');
  }

  if (loading) return <h1 className="App, App-header">Loading...</h1>
  if (error) return <h1>Error loading movies: {error}</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
        <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} removeClicked={removeClicked} />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? <MovieForm movie={editedMovie} updateMovie={updateMovie} movieCreated={movieCreated} /> : null}
      </div>
    </div>
  );
}

export default App;

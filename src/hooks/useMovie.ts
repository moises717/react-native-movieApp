import {useEffect, useState} from 'react';
import movieDb from '../api/moviedb';
import {Movie, MovieDBNowResponse} from '../interfaces/movieInterface';

interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MovieState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovie = async () => {
    const nowPlaying = movieDb.get<MovieDBNowResponse>('/now_playing');
    const popular = movieDb.get<MovieDBNowResponse>('/popular');
    const topRated = movieDb.get<MovieDBNowResponse>('/top_rated');
    const upComing = movieDb.get<MovieDBNowResponse>('/upcoming');

    const [nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies] =
      await Promise.all([nowPlaying, popular, topRated, upComing]);

    setMovies({
      nowPlaying: nowPlayingMovies.data.results,
      popular: popularMovies.data.results,
      topRated: topRatedMovies.data.results,
      upcoming: upComingMovies.data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return {
    ...movies,
    isLoading,
  };
};

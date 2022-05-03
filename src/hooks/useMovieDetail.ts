import {useEffect, useState} from 'react';
import {MovieFull} from '../interfaces/movieInterface';
import movieDb from '../api/moviedb';
import {Cast, CreditResponse} from '../interfaces/creditInterface';

interface MovieDetail {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull;
}

export default function useMovieDetail(movieId: number) {
  const [movieDetail, setMovieDetail] = useState<MovieDetail>({
    cast: [],
    isLoading: true,
    movieFull: undefined,
  });

  const getMovieDetail = async () => {
    let movieDetailPromise = movieDb.get<MovieFull>(`/${movieId}`);
    let movieCredits = movieDb.get<CreditResponse>(`/${movieId}/credits`);

    let [movie, credits] = await Promise.all([
      movieDetailPromise,
      movieCredits,
    ]);

    setMovieDetail({
      cast: credits.data.cast,
      isLoading: false,
      movieFull: movie.data,
    });
  };

  useEffect(() => {
    getMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...movieDetail,
  };
}

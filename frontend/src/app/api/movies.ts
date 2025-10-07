const API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
export async function fetchTrendingMovies() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    const data = await response.json();
    return data.results;
  }
  
  export async function fetchMoviesByGenre(genreId: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=en-US`
    );
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();
    return data.results;
  }

  export async function fetchMovieById(id: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`
    );
    if (!response.ok) throw new Error(`Failed to fetch movie with ID ${id}`);
    return response.json();
  }

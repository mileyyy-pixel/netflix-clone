const API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
export async function fetchTrendingMovies() {

    const response = await fetch('http://localhost:3000/movies/trending');
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    return response.json();
  }
  
  export async function fetchMoviesByGenre(genreId: number) {
    const response = await fetch(`http://localhost:3000/movies/genre/${genreId}`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  }

  export async function fetchMovieById(id: string) {
    
    const response = await fetch(`http://localhost:3000/movies/${id}`);

  if (!response.ok) throw new Error(`Failed to fetch movie with ID ${id}`);
 
  return response.json();
  }

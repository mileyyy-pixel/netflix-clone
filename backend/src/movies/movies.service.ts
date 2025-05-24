import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly tmdbApiUrl = 'https://api.themoviedb.org/3';
  
  constructor(private configService: ConfigService) {}

  private readonly apiKey = this.configService.get<string>('TMDB_API_KEY');

  async getTrendingMovies() {
    try {
      const response = await axios.get<{ results: any[] }>(`${this.tmdbApiUrl}/trending/movie/day`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
        },
      }); 
      return (response.data as { results: any[] }).results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw new Error('Unable to fetch trending movies');
    }
  }

  async getPopularMovies() {
    try {
      const response = await axios.get<{ results: any[] }>(`${this.tmdbApiUrl}/movie/popular`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Unable to fetch popular movies');
    }
  }

  async getMoviesByGenre(genreId: number) {
    try {
      const response = await axios.get<{ results: any[] }>(`${this.tmdbApiUrl}/discover/movie`, {
        params: {
          api_key: this.apiKey,
          with_genres: genreId,
          language: 'en-US',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw new Error('Unable to fetch movies by genre');
    }
  }

  async getMovieDetails(movieId: number) {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/movie/${movieId}`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Unable to fetch movie details');
    }
  }
  async findById(id: String) { 
    const response = await fetch (
      `${this.tmdbApiUrl}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`

    );

    if (!response.ok) throw new Error(`Movie not found: ${id}`);
    return response.json();
  
}
}




      


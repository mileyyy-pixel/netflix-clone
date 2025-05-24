import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('trending')
  getTrendingMovies() {
    return this.moviesService.getTrendingMovies();
  }

  @Get('popular')
  getPopularMovies() {
    return this.moviesService.getPopularMovies();
  }

  @Get('genre/:genreId')
  getMoviesByGenre(@Param('genreId') genreId: number) {
    return this.moviesService.getMoviesByGenre(genreId);
  }

  @Get(':movieId')
  getMovieDetails(@Param('movieId') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }

 @Get(':id')
 getMovieById(@Param('id') id:String) {
  return this.moviesService.findById(id);
 }
}

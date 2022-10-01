import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  topRated: Movie[] = [];
  loader = true;
  Upcome: Movie[]=[];
  searchRes:Movie[] = [];
  searchStr!: any;
  totalResults: any;
  constructor(private movieService: MovieService) { }

  
  ngOnInit(){
    this.getTopRatedMovies(1);
   
  }

  
  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(1000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }
 
  searchMovies() {
    this.movieService.searchMovies(this.searchStr).subscribe(res => {
      this.searchRes = res.results;
    });
  }
}
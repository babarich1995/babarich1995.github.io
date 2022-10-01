import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movies.service';
import { Movie } from './../movie.model';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-upcomin',
  templateUrl: './upcomin.component.html',
  styleUrls: ['./upcomin.component.css']
})
export class UpcominComponent implements OnInit {
  loader = true;
  Upcome: Movie[]=[];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getUpcomingMovies(1);
  }
  getUpcomingMovies(page: number){
    this.movieService.getUpComingMovies(page).pipe(delay(1000)).subscribe((res: any) => {
      this.Upcome = res.results;
      this.loader = false;
    },
    error => console.log(error));
  }
}

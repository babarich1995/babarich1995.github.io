import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { Genres, Movie } from '../movies/movie.model';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.css']
})
export class NowplayingComponent implements OnInit {
  nowPlaying: Movie[]=[];
  genreList: any;
  loader = true;
  constructor(private movies: MovieService) { }

  ngOnInit(): void {
    this.listGenre();
    this.trendingMovie(1);
   
  }
  
  trendingMovie(page: number) {
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.results;
      this.loader = false;
    });
  }
  listGenre() {
    this.movies.getGenres().subscribe((res: any) => {
      this.genreList = res.genres;
      this.loader = false;
      console.log(this.genreList)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { Movie } from '../movies/movie.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loader = true;
  Upcome: Movie[]=[];
  isLoginMode = true;
  isLoading = false;
  error: string = null!;
  constructor(private movieService: MovieService, private authService: AuthService,
     private router: Router) { }

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
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const requestToken = form.value.requestToken;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(username, password);
    } else {
      authObs = this.authService.signup(username, password,requestToken);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}

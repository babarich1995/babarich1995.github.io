import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  success: string;
  requestToken: string;
  username: string;
  expiresAt: string;
  password: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  private tokenExpirationTimer: any;
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;
  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'c3612c0718ad5a9e707c01215bac2e37';
    this.language = 'en-US';
    this.region = 'US';
  }

getToken(){
  return this.http.get(`${this.baseUrl}authentication/token/new?api_key=${this.apiKey}`);
  
}

  signup(username: string, password: string, requestToken:string) {
    return this.http
      .post<AuthResponseData>(
        (`${this.baseUrl}authentication/token/new?api_key=${this.apiKey}`),
        {
          username: username,
          password: password,
          requestToken: requestToken
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.username,
            resData.password,
            resData.requestToken,
           
          );
        })
      );
  }
  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        (`${this.baseUrl}authentication/token/validate_with_login?api_key=${this.apiKey}`),
        {
          username: username,
          password: password,
          request_token:this.getToken 
        }
      )
      
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.username,
            resData.password,
            resData.requestToken,
          
          );
        })
      );
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    password: string,
    request_token: string,
  
  ) {
    
    const user = new User(username, password, request_token,);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

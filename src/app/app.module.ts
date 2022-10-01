import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { NowplayingComponent } from './nowplaying/nowplaying.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MaterialModule } from './shared/material.module';
import { MenuComponent } from './menu/menu.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { UpcominComponent } from './movies/upcomin/upcomin.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MoviesComponent,
    HomeComponent,
    NowplayingComponent,
    MenuComponent,
    MovieDetailComponent,
    TvSeriesComponent,
    UpcominComponent,
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { UpcominComponent } from './movies/upcomin/upcomin.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path:'', component:HomeComponent,

  children:[
    {path:'movies', component:MoviesComponent},
    {path:'movies/:id', component:MovieDetailComponent},
    {path:'upcoming', component:UpcominComponent},
    {path:'tv', component:TvSeriesComponent},

  ]
},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

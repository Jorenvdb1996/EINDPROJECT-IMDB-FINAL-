import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'moviedetail',
    loadChildren: () => import('./movie/moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },
  {
    path: 'listmovies',
    loadChildren: () => import('./movie/listmovies/listmovies.module').then( m => m.ListmoviesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'moviedetail',
    loadChildren: () => import('./movie/moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },
  {
    path: 'moviedetail/:id',
    loadChildren: () => import('./movie/moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

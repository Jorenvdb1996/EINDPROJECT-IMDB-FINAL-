import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListmoviesPage } from './listmovies.page';

const routes: Routes = [
  {
    path: '',
    component: ListmoviesPage
  },
  {
    path: 'moviedetail',
    loadChildren: () => import('../moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },
  {
    path: 'moviedetail/:id',
    loadChildren: () => import('../moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListmoviesPageRoutingModule {}

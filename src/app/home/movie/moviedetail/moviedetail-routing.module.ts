import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviedetailPage } from './moviedetail.page';

const routes: Routes = [
  {
    path: '',
    component: MoviedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviedetailPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WijzigenPage } from './wijzigen.page';

const routes: Routes = [
  {
    path: '',
    component: WijzigenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WijzigenPageRoutingModule {}

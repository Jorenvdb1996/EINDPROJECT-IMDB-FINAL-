import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToevoegenPage } from './toevoegen.page';

const routes: Routes = [
  {
    path: '',
    component: ToevoegenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToevoegenPageRoutingModule {}

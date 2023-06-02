import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistreerPage } from './registreer.page';

const routes: Routes = [
  {
    path: '',
    component: RegistreerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistreerPageRoutingModule {}

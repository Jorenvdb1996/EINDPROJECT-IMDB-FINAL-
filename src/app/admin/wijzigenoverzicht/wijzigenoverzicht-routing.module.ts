import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WijzigenoverzichtPage } from './wijzigenoverzicht.page';

const routes: Routes = [
  {
    path: '',
    component: WijzigenoverzichtPage
  },
  {
    path: 'wijzigen',
    loadChildren: () => import('../wijzigen/wijzigen.module').then( m => m.WijzigenPageModule)
  },
  {
    path: 'wijzigen',
    loadChildren: () => import('../wijzigen/wijzigen.module').then( m => m.WijzigenPageModule)
  },
  {
    path: 'wijzigen/:id',
    loadChildren: () => import('../wijzigen/wijzigen.module').then( m => m.WijzigenPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WijzigenoverzichtPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {

    path: '',
    component: AdminPage
  },
  {
    path: 'toevoegen',
    loadChildren: () => import('./toevoegen/toevoegen.module').then( m => m.ToevoegenPageModule)
  },
  {
    path: 'wijzigen',
    loadChildren: () => import('./wijzigen/wijzigen.module').then( m => m.WijzigenPageModule)
  },
  {
    path: 'wijzigenoverzicht',
    loadChildren: () => import('./wijzigenoverzicht/wijzigenoverzicht.module').then( m => m.WijzigenoverzichtPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

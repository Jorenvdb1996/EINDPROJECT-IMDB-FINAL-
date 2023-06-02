import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'listmovies',
    loadChildren: () => import('./home/movie/listmovies/listmovies.module').then( m => m.ListmoviesPageModule)
  },
  {
    path: 'moviedetail',
    loadChildren: () => import('./home/movie/moviedetail/moviedetail.module').then( m => m.MoviedetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'registreer',
    loadChildren: () => import('./login/registreer/registreer.module').then( m => m.RegistreerPageModule)
  },
  {
    path: 'toevoegen',
    loadChildren: () => import('./admin/toevoegen/toevoegen.module').then( m => m.ToevoegenPageModule)
  },
  {
    path: 'wijzigen',
    loadChildren: () => import('./admin/wijzigen/wijzigen.module').then( m => m.WijzigenPageModule)
  },
  {
    path: 'wijzigenoverzicht',
    loadChildren: () => import('./admin/wijzigenoverzicht/wijzigenoverzicht.module').then( m => m.WijzigenoverzichtPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

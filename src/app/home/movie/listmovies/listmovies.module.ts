import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListmoviesPageRoutingModule } from './listmovies-routing.module';

import { ListmoviesPage } from './listmovies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListmoviesPageRoutingModule
  ],
  declarations: [ListmoviesPage]
})
export class ListmoviesPageModule {}

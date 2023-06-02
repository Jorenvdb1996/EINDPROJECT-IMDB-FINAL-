import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WijzigenoverzichtPageRoutingModule } from './wijzigenoverzicht-routing.module';

import { WijzigenoverzichtPage } from './wijzigenoverzicht.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WijzigenoverzichtPageRoutingModule,
    SharedModule
  ],
  declarations: [WijzigenoverzichtPage]
})
export class WijzigenoverzichtPageModule {}

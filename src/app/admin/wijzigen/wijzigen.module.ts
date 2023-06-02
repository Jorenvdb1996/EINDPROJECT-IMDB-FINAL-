import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WijzigenPageRoutingModule } from './wijzigen-routing.module';

import { WijzigenPage } from './wijzigen.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WijzigenPageRoutingModule,
    SharedModule
  ],
  declarations: [WijzigenPage]
})
export class WijzigenPageModule {}

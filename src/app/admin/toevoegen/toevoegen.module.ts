import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToevoegenPageRoutingModule } from './toevoegen-routing.module';

import { ToevoegenPage } from './toevoegen.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToevoegenPageRoutingModule,
    SharedModule
  ],
  declarations: [ToevoegenPage]
})
export class ToevoegenPageModule {}

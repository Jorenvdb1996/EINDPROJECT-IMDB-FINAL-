import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistreerPageRoutingModule } from './registreer-routing.module';

import { RegistreerPage } from './registreer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistreerPageRoutingModule
  ],
  declarations: [RegistreerPage]
})
export class RegistreerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StarRatingComponent} from './star-rating/star-rating.component';



@NgModule({
  declarations: [ImageUploadComponent,StarRatingComponent],
  exports: [ImageUploadComponent,StarRatingComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class SharedModule { }

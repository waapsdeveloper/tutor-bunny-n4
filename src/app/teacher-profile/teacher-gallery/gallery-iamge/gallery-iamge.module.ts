import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryIamgePageRoutingModule } from './gallery-iamge-routing.module';

import { GalleryIamgePage } from './gallery-iamge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryIamgePageRoutingModule
  ],
  declarations: [GalleryIamgePage]
})
export class GalleryIamgePageModule {}

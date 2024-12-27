import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialPhotoComponent } from './material-photo.component';


@NgModule({
  declarations: [MaterialPhotoComponent],
  imports: [
    CommonModule,
    IonicModule

  ],
  exports: [MaterialPhotoComponent]

})
export class MaterialPhotoModule { }

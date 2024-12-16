import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialPhotoRoutingModule } from './material-photo-routing.module';
import { MaterialPhotoComponent } from './material-photo.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';


@NgModule({
  declarations: [MaterialPhotoComponent],
  imports: [
    CommonModule,
    MaterialPhotoRoutingModule,
    IonicModule,
    SdErrorInputInfoModule,
   
  ],
    exports: [MaterialPhotoComponent]
  
})
export class MaterialPhotoModule { }

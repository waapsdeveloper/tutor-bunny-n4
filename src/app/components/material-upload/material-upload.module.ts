import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { MaterialUploadComponent } from './material-upload.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MaterialUploadComponent],
  imports: [
    CommonModule,
    SdErrorInputInfoModule,
    IonicModule,
    
  ],
  exports: [MaterialUploadComponent]
})
export class MaterialUploadModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdShareButtonComponent } from './sd-share-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdShareButtonComponent],
  imports: [
    CommonModule,
    IonicModule
    
  ],
  exports:[SdShareButtonComponent]
})
export class SdShareButtonModule { }

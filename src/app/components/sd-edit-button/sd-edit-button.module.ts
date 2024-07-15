import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdEditButtonComponent } from './sd-edit-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdEditButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[SdEditButtonComponent]
})
export class SdEditButtonModule { }

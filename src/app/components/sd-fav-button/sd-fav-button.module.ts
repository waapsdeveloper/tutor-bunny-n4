import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdFavButtonComponent } from './sd-fav-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SdFavButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[SdFavButtonComponent]
})
export class SdFavButtonModule { }

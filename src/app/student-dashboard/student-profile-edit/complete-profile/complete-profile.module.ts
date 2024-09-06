import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteProfileComponent } from './complete-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';



@NgModule({
  declarations: [CompleteProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdButtonClearModule,
    SdButtonGrayModule
  ],
  exports:[CompleteProfileComponent]
})
export class CompleteProfileModule { }

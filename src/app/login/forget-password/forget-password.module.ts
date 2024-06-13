import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { IonicModule } from '@ionic/angular';
import { SdInputBoxModule } from 'src/app/components/sd-input-box/sd-input-box.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';



@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdInputBoxModule,
    SdButtonGrayModule
  ],
  exports: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailMessageComponent } from './trail-message.component';
import { FormsModule } from '@angular/forms';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TrailMessageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdButtonClearModule,
    SdButtonGrayModule,
  ],
  exports: [TrailMessageComponent]
})
export class TrailMessageModule { }

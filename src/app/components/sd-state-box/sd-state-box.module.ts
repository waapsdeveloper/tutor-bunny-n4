import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdStateBoxComponent } from './sd-state-box.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StateListModule } from './state-list/state-list.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';



@NgModule({
  declarations: [SdStateBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StateListModule,
    SdErrorInputInfoModule
  ],
  exports: [SdStateBoxComponent]
})
export class SdStateBoxModule { }

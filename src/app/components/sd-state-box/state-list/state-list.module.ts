import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateListComponent } from './state-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';



@NgModule({
  declarations: [StateListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdHeaderTopModule
  ],
  exports:[StateListComponent]
})
export class StateListModule { }

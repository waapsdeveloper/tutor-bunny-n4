import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeListComponent } from './age-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';



@NgModule({
  declarations: [AgeListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdHeaderTopModule
  ],
  exports: [AgeListComponent]
})
export class AgeListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyListComponent } from './policy-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';



@NgModule({
  declarations: [PolicyListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdHeaderTopModule
  ],
  exports: [PolicyListComponent]
})
export class PolicyListModule { }

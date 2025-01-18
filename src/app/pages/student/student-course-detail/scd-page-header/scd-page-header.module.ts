import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageHeaderComponent } from './scd-page-header.component';
import { IonicModule } from '@ionic/angular';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';



@NgModule({
  declarations: [ScdPageHeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdHeaderTopModule
  ],
  exports: [ScdPageHeaderComponent]
})
export class ScdPageHeaderModule { }

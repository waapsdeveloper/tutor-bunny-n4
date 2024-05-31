import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdCategoryListComponent } from './sd-category-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';



@NgModule({
  declarations: [SdCategoryListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdHeaderTopModule,
    SdButtonGrayModule
  ],
  exports:[SdCategoryListComponent]
})
export class SdCategoryListModule { }

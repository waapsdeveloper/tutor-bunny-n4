import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdYearBoxComponent } from './sd-year-box.component';

@NgModule({
  declarations: [SdYearBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SdYearBoxComponent],
})
export class SdYearBoxModule {}

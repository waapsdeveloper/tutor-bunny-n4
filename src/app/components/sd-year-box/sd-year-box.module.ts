import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdYearBoxComponent } from './sd-year-box.component';
import { SelectYearModule } from './select-year/select-year.module';

@NgModule({
  declarations: [SdYearBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule, SelectYearModule],
  exports: [SdYearBoxComponent],
})
export class SdYearBoxModule {}

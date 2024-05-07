import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdInputBoxComponent } from './sd-input-box.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdInputBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdErrorInputInfoModule],
  exports: [SdInputBoxComponent],
})
export class SdInputBoxModule {}

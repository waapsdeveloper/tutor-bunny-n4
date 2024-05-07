import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdTextareaBoxComponent } from './sd-textarea-box.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdTextareaBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdErrorInputInfoModule],
  exports: [SdTextareaBoxComponent],
})
export class SdTextareaBoxModule {}

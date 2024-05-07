import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdTextareaAboutComponent } from './sd-textarea-about.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [SdTextareaAboutComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdErrorInputInfoModule],
  exports: [SdTextareaAboutComponent],
})
export class SdTextareaAboutModule {}

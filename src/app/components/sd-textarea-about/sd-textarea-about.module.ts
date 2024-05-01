import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdTextareaAboutComponent } from './sd-textarea-about.component';

@NgModule({
  declarations: [SdTextareaAboutComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SdTextareaAboutComponent],
})
export class SdTextareaAboutModule {}

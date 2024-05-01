import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdTextareaBoxComponent } from './sd-textarea-box.component';

@NgModule({
  declarations: [SdTextareaBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SdTextareaBoxComponent],
})
export class SdTextareaBoxModule {}

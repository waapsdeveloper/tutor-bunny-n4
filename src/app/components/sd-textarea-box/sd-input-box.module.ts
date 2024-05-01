import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdInputBoxComponent } from './sd-input-box.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SdInputBoxComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SdInputBoxComponent],
})
export class SdInputBoxModule {}

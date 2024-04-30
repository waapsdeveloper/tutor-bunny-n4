import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdButtonClearComponent } from './sd-button-clear.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SdButtonClearComponent],
  imports: [CommonModule, IonicModule],
  exports: [SdButtonClearComponent],
})
export class SdButtonClearModule {}

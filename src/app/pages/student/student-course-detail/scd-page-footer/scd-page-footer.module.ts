import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScdPageFooterComponent } from './scd-page-footer.component';
import { IonicModule } from '@ionic/angular';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';



@NgModule({
  declarations: [ScdPageFooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdButtonClearModule
  ],
  exports: [ScdPageFooterComponent]
})
export class ScdPageFooterModule { }

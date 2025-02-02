import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardItemComponent } from './payment-card-item.component';
import { SdInputBoxModule } from '../../../../components/sd-input-box/sd-input-box.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PaymentCardItemComponent],
  imports: [CommonModule, IonicModule, SdInputBoxModule],
  exports: [PaymentCardItemComponent],
})
export class PaymentCardItemModule {}

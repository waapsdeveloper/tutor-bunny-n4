import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardItemComponent } from './payment-card-item.component';



@NgModule({
  declarations: [PaymentCardItemComponent],
  imports: [
    CommonModule
  ],
  exports: [PaymentCardItemComponent]
  
})
export class PaymentCardItemModule { }

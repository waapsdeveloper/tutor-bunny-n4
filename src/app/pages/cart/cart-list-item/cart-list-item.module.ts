import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListItemComponent } from './cart-list-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    CartListItemComponent
  ]
})
export class CartListItemModule { }

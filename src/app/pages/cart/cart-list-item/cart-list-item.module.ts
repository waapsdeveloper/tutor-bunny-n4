import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListItemComponent } from './cart-list-item.component';

@NgModule({
  declarations: [CartListItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CartListItemComponent
  ]
})
export class CartListItemModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss'],
})
export class CartListItemComponent {

  @Output() openDetails = new EventEmitter<any>()
  @Output() removeCartitem = new EventEmitter<any>();
  @Output() updateSelection = new EventEmitter<any>();

  private _item: any;

  @Input()
  get item(){
    return this._item;
  }

  set item(value: any){
    this._item = value;
    
  }

  constructor() { }

  initialize(){

  }

}

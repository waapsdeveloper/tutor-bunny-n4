import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-rating-item',
  templateUrl: './single-rating-item.component.html',
  styleUrls: ['./single-rating-item.component.scss'],
})
export class SingleRatingItemComponent {
  
  heading = '';
  text = '';
  

  private _item: any; 
  @Input()
  set item(value: any) {
    this._item = value;
    this.updateUserDetails(value);
  }

  get item(): any {
    return this._item;
  }

  constructor() { }

  updateUserDetails(value: any) {

  }

}

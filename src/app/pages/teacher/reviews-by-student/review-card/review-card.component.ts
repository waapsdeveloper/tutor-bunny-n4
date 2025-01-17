import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {
  rating;
  flag;

  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  };

  public set item(value: any) {
    this._item = value;
    this.flag = this.getFlag();
    this.rating = value.rating;
  }

  constructor() { }



  getFlag() {

    if (this.item && this.item.user.student && this.item.user.student.country) {
      const flag = this.item.user.student.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else {
      return "";
    }
  }


}

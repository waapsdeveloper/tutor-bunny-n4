import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-info',
  templateUrl: './scd-page-info.component.html',
  styleUrls: ['./scd-page-info.component.scss'],
})
export class ScdPageInfoComponent  implements OnInit {
  private _data: any; 
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateUserDetails(value);
  }

  get data(): any {
    return this._data;
  }

  title;
  currencySymbol;
  price;
  rating;
  total_rating;

  constructor() { }

  updateUserDetails(value: any) {
    if (value) {
      this.title = value.title;
      this.currencySymbol = value.currencySymbol;
      this.price = value.price;
      this.rating = value.rating;
      this.total_rating = value.totalRating;
    }
  }


  ngOnInit() {}

}

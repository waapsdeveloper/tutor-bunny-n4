import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-info',
  templateUrl: './scd-page-info.component.html',
  styleUrls: ['./scd-page-info.component.scss'],
})
export class ScdPageInfoComponent implements OnInit {

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
  per_unit;

  constructor() { }

  updateUserDetails(value: any) {
    if (value) {
      this.title = value.title;
      this.currencySymbol = value.currency_symbol;
      this.price = value.price;
      this.rating = parseFloat(value.rating).toFixed(1);
      this.total_rating = value.total_rating;
      this.per_unit = value.per_unit;
    }
  }


  ngOnInit() {}

}

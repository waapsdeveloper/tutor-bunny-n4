import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-stp-page-header',
  templateUrl: './stp-page-header.component.html',
  styleUrls: ['./stp-page-header.component.scss'],
})
export class StpPageHeaderComponent {
  
  @Output() back = new EventEmitter<any>()
  
  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  user_image;
  displayName;
  status;
  verified_on;
  rating;
  total_rating;

  constructor(private nav: NavService) {}

  updateDetails(value: any) {
    if (value) {
      this.user_image = value.image;
      this.displayName = value.displayName;
      this.status = value.status;
      this.verified_on = value.verifiedOn;
      this.rating = value.rating;
      this.total_rating = value.totalRating;
    }
  }

  openEditProfile() {
    //
  }

}

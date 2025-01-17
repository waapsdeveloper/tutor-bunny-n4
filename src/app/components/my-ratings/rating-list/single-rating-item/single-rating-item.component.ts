import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-single-rating-item',
  templateUrl: './single-rating-item.component.html',
  styleUrls: ['./single-rating-item.component.scss'],
})
export class SingleRatingItemComponent {
  
  image = '';
  displayName = '';
  location = '';  
  flag = '';
  text = '';
  rating = 0;

  

  private _item: any; 
  @Input()
  set item(value: any) {
    this._item = value;
    this.updateUserDetails(value);
  }

  get item(): any {
    return this._item;
  }

  constructor(private utility: UtilityService) { }

  updateUserDetails(value: any) {

    console.log(value);

    if(value){
      this.text = value.message;
      this.rating = value.rating;
      this.displayName = value.user.name
      this.location = this.utility.getLocation(value.user);
      this.flag = this.utility.getFlag(value.user);

      if(value.user.image){
        this.image = `url(${value.user.image})`
      }

    }
    // let 

  }

  



}

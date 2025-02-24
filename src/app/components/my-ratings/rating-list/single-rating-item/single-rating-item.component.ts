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
  text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
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

    console.log(value,"single rating item");

    if(value){
      // this.text = value.message;
      this.rating = value.rating;
      this.displayName = value.user.name
      this.location = this.utility.getLocation(value.user);
      this.flag = this.utility.getFlag(value.user);
      this.text = value.message;
      if(value.user.image){
        this.image = `url(${value.user.image})`
      }

    }
    // let

  }





}

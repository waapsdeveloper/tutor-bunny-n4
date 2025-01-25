import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.scss'],
})
export class SlideBannerComponent {

  @Output() back = new EventEmitter<any>();
  @Output() tapAction = new EventEmitter<any>();

  actions: any[] = [];

  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  is_liked_by_me = false;
  sliderImages: any[] = []


  constructor() {}

  updateDetails(value: any) {
    if (value) {
      this.is_liked_by_me = value.is_liked_by_me ?? false;
      this.sliderImages = value.sliderImages ?? [];


      this.actions = value.actions.map(action => {
        if (action.name === 'favorite') {
          action.img = this.is_liked_by_me ? 'assets/svg/heart-77.svg' : 'assets/svg/heart-78.svg';
        }
        action.action = () => this.tapAction.emit(action);
        return action;
      });





    }
  }

}

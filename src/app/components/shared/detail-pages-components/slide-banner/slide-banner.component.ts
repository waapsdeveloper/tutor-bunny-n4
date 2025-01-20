import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.scss'],
})
export class SlideBannerComponent {

  @Output() back = new EventEmitter<any>();
  @Output() favToggle = new EventEmitter<any>();

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
    }
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.scss'],
})
export class MyRatingsComponent {

  
  private _data: any; 
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateUserDetails(value);
  }

  get data(): any {
    return this._data;
  }


  heading: string = '';
  list: any[] = [];

  @Output() seeallEmit = new EventEmitter<any>();

  constructor() {
    
  }

  
  updateUserDetails(value: any){

    if (value) {
      this.heading = value.heading || '';
      this.list = value.list || [];
    }

  }

}

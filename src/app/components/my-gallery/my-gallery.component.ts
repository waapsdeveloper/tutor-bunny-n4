import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
})
export class MyGalleryComponent {

 
  
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

  // goToGallery() {

  //   const obj = {
  //     backUrl: '/teacher-profile',
  //     gallary: "false",
  //     title: 'My Gallery',
  //     id: this.user_Id
  //   }
  //   this.nav.push('/teacher-profile/teacher-gallery', obj)
  // }

}

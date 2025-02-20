import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryViewerComponent } from './gallery-viewer/gallery-viewer.component';

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

  constructor(private modals: ModalService) {
    
  }

  
  updateUserDetails(value: any){

    if (value) {
      this.heading = value.heading || '';
      this.list = value.list || [];
    }

  }

  openGalleryList(){
  
    // GalleryListComponent
    this.modals.present(GalleryViewerComponent, {
      list: this.list
    }, '', 1, [0,1], true)

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

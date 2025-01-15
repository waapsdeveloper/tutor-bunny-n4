import { Component, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
})
export class GalleryListComponent {
  
  
  @Input() list: any[] = [];  
  @Output() clickOpen = new EventEmitter<any>()
  
  constructor() {

  }  

    // this.params = this.nav.getQueryParams();
    // if (this.params.id) {
    //   this.userId = this.params.id;
    // }
  // }

  // async initialize() {
  //   // const user = this.users.getUser();
  //   const res = await this.network.getImage(this.user.id) as any;
  //   this.images = res.result;
  // }

  setBackgroundImage(item) {
    return `url('${item.image}')`
  }
  openImage(image){
    
  }

  //   this.nav.push('/teacher-profile/teacher-gallery/gallery-image', {

  //     backUrl: '/tabs/teacher-profile',
  //     image: image,
  //   })
  // }

}

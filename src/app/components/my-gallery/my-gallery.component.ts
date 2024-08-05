import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
})
export class MyGalleryComponent extends BasePage implements OnInit {
  
  @Input() user;

  user_Id;

  constructor(injector: Injector) {

    super(injector)
  }

  ngOnInit() {
    console.log(this.user);
    this.user_Id = this.user.id
    
   }

  goToGallery() {

    const obj = {
      backUrl: '/teacher-profile',
      gallary: "false",
      title: 'My Gallery',
      id: this.user_Id
    }
    this.nav.push('/teacher-profile/teacher-gallery', obj)
  }

}

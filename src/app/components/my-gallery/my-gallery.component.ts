import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
})
export class MyGalleryComponent extends BasePage implements OnInit {

  user_Id;
  _user;
  @Input()
  public get user(){
    return this._user;
  }

  public set user(value){
    this._user = value;
    this.user_Id = value?.id;

    console.log("gallery-user", this.user);
    this.user_Id = this.user.id
  }





  constructor(injector: Injector) {

    super(injector)
  }

  ngOnInit() {
    console.log("gallery component initiated")
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

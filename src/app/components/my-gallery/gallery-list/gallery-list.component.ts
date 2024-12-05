import { Component, Injector, OnInit, Input } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
})
export class GalleryListComponent extends BasePage implements OnInit {
  _user;
  images = []
  list;
  params: any;
  userId;

  @Input()
  public get user(){
    return this._user;
  }

  public set user(value){
    this._user = value;
    this.initialize();
  }


  constructor( injector:Injector) {
    super(injector)

  }

  ngOnInit() {
    console.log("gallery-page initialized");
    // this.params = this.nav.getQueryParams();
    // if (this.params.id) {
    //   this.userId = this.params.id;
    // }
  }

  async initialize() {
    // const user = this.users.getUser();
    const res = await this.network.getImage(this.user.id) as any;
    this.images = res.result;
  }

  setBackgroundImage(item) {

    return `url('${item.image}')`

  }
  openImage(image){

    this.nav.push('/teacher-profile/teacher-gallery/gallery-image', {

      backUrl: '/tabs/teacher-profile',
      image: image,
    })
  }

}

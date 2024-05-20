import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
})
export class GalleryListComponent implements OnInit {
  user;
  images = []
  list;
  constructor(private network: NetworkService, public users: UsersService) {
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    const user = this.users.getUser();
    const res = await this.network.getImage(user.id) as any;
    console.log(res);
    this.images = res.result;



  }

  setBackgroundImage(item) {

    return `url('${item.image}')`

  }

}

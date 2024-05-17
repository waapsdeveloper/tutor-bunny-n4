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
  images = [
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
  ]
  list;
  constructor(private network: NetworkService, public users: UsersService) {
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    const user = this.users.getUser();
    const res = await this.network.getImage(user.id) as any;
    console.log(res);

    let list = res.result;

    for (var i = 0; i < list.length; i++) {

      let item = list[i];
      let firstIndex = this.images.findIndex(x => x.image == null);
      console.log(firstIndex);

      if (firstIndex != -1) {
        this.images[firstIndex]['id'] = item.id;
        this.images[firstIndex]['image'] = item.image;
      }
    }

  }

  setBackgroundImage(item) {

    return `url('${item.image}')`

  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'console';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-gallery',
  templateUrl: './teacher-gallery.page.html',
  styleUrls: ['./teacher-gallery.page.scss'],
})
export class TeacherGalleryPage implements OnInit {

  backUrl = '/teacher-profile/teacher-profile-edit';
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


  constructor(private sanitizer: DomSanitizer, private network: NetworkService,) {

    this.initialize();
  }
  ngOnInit() {
  }
  async initialize() {
    this.user = JSON.parse(localStorage.getItem('user'));
    let user_id = this.user.id;
    this.list  = await this.network.getImage(user_id) as any [];
    this.images = this.list.result;

  }
  setBackgroundImage(image) {
    return
  }
  async addImageInArray(string) {
    let firstIndex = this.images.findIndex(x => x.image == null);
    // console.log(firstIndex);
    this.images[firstIndex]['id'] = firstIndex;
    this.images[firstIndex]['image'] = string;
    let obj = {
      user_id: this.user.id,
      image: string
    }
    let res = await this.network.postImages(obj)
    // console.log(res);
    this.initialize();
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      this.addImageInArray(reader.result as string)
    };
    reader.readAsDataURL(file);
  }
}

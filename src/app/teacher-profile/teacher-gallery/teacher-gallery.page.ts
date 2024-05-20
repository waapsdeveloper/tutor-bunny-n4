import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'console';
import { BasePage } from 'src/app/base-page/base-page';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-gallery',
  templateUrl: './teacher-gallery.page.html',
  styleUrls: ['./teacher-gallery.page.scss'],
})
export class TeacherGalleryPage extends BasePage implements OnInit {

  backUrl = '/teacher-profile/teacher-profile-edit';
  user;
  images = []
  list;
  params;
  title;
  gallery = "false";

  constructor(injector: Injector) {
    super(injector)

    this.initialize();
  }
  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    if (this.params.gallary) {
      this.gallery = this.params.gallary;
      console.log(this.gallery);

    }

    if (this.params.title) {
      this.title = this.params.title;
    }


  }
  async initialize() {
    const user = this.users.getUser();
    const res = await this.network.getImage(user.id) as any;
    console.log(res);

    this.images = res.result;
  }
  setBackgroundImage(item) {

    return `url('${item.image}')`

  }
  async addImageInArray(string) {
    console.log(this.images)
    let firstIndex = this.images.findIndex(x => x.image == null);
    console.log(firstIndex);
    if (firstIndex != -1) {
      this.images[firstIndex]['id'] = firstIndex;
      this.images[firstIndex]['image'] = string;
    }
    const user = this.users.getUser();
    let obj = {
      user_id: user.id,
      image: string
    }
    let res = await this.network.postImages(obj)
    console.log(res);
    let image = res.result.image;

    this.events.publish('change-sample-image-to-this', image)
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

  Back() {
    this.nav.pop('/teacher-profile')
  }
}

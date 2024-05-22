import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GalleryImagePage } from './gallery-image/gallery-image.page';

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
  backBtn ='';
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

    if (this.params.gallary) {
      this.gallery = this.params.gallary;
    }

    if (this.params.title) {
      this.title = this.params.title;
    }
    if (this.params.backUrl) {
      this.backBtn = this.params.backUrl;
    }


  }
  async initialize() {
    const user = this.users.getUser();
    const res = await this.network.getImage(user.id) as any;
    this.images = res.result;
  }
  setBackgroundImage(item) {

    return `url('${item.image}')`

  }
  async addImageInArray(string) {
    let firstIndex = this.images.findIndex(x => x.image == null);
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
    this.nav.pop('/teacher-profile/teacher-profile-edit')
  }

  async clearImage(id: string, event: Event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    await this.network.deleteImage(id);
    this.initialize();
}
  openImage(image){

    this.nav.push('/teacher-profile/teacher-gallery/gallery-image', {

      backUrl: '/teacher-profile/teacher-gallery',
      image: image
    })
  }
}

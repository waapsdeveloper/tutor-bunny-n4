import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-sd-image-box',
  templateUrl: './sd-image-box.component.html',
  styleUrls: ['./sd-image-box.component.scss'],
})
export class SdImageBoxComponent implements OnInit {
  @Input('profilePhoto') profilePhoto: SafeUrl | undefined;
  @Input('photoId') photoId: SafeUrl | undefined;
  @Output('openGallery') openGallery: EventEmitter<any> = new EventEmitter<any>();
  @Output('updateImage') updateImage: EventEmitter<any> = new EventEmitter<any>();
  @Output('updatePhotoId') updatePhotoId: EventEmitter<any> = new EventEmitter<any>();

  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;

  @Input('image') image = '';

  sampleGalleryImage = '/assets/gallary.png'

  constructor(private network: NetworkService, private events: EventsService, public users: UsersService) {
    this.initialize()
  }
  ngOnInit() {

    this.events.subscribe('teacher-profile-second-screen-submit-call', (formData: any) => {

      if (!formData.image) {
        this.isRequired = true;
        this.errorText = 'Image is required to upload'
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      } else if (!formData.photo_id) {
        this.isRequired = true;
        this.errorText = 'Photo ID is required to upload'
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)

    this.events.subscribe('change-sample-image-to-this', (image: any) => {

      if (image) {
        this.sampleGalleryImage = image;
      }

    }, false)

  }

  initialize() {
    const user = this.users.getUser();
    this.profilePhoto = user.image;
    this.photoId = user.teacher.photo_id;

    this.getGalleryImages();
  }

  async getGalleryImages(){

    const user = this.users.getUser();
    const res = await this.network.getImage(user.id) as any;

    let list = res.result;
    if(list.length > 0){
      let item = list[0];
      this.sampleGalleryImage = item.image
    }
  }

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;
      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi
      }
      const res = await this.network.postProfileImage(obj)
      this.profilePhoto = res.result.image;
      this.updateImage.emit(this.profilePhoto)

    };
    reader.readAsDataURL(file);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmil = reader.result as string;
      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmil
      }
      const res = await this.network.postPhotoIdImage(obj)
      this.photoId = res.result.image;
      this.updatePhotoId.emit(this.photoId)
    };
    reader.readAsDataURL(file);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-sd-image-box',
  templateUrl: './sd-image-box.component.html',
  styleUrls: ['./sd-image-box.component.scss'],
})
export class SdImageBoxComponent  implements OnInit {

  profilePhoto: SafeUrl | undefined;
  photoId: SafeUrl | undefined;

  @Output('openGallery') openGallery: EventEmitter<any> = new EventEmitter<any>();
  @Output('updateImage') updateImage: EventEmitter<any> = new EventEmitter<any>();
  @Output('updatePhotoId') updatePhotoId: EventEmitter<any> = new EventEmitter<any>();




  constructor(private network: NetworkService) { }

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.profilePhoto = user.image;
    this.photoId = user.teacher.photo_id;


  }

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;
      console.log(pmi);

      // send it to API for upload
      let user = JSON.parse(localStorage.getItem('user'));

      let obj = {
        user_id: user.id,
        image: pmi
      }

      const res = await this.network.postProfileImage(obj)
      console.log(res);
      this.profilePhoto = res.result.image;
      this.updateImage.emit(res.image)

    };
    reader.readAsDataURL(file);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;
      console.log(this.photoId);

      // send it to API for upload
      let user = JSON.parse(localStorage.getItem('user'));

      let obj = {
        user_id: user.id,
        image: pmi
      }

      const res = await this.network.postPhotoIdImage(obj)
      console.log(res);
      this.photoId = res.result.image;
      this.updatePhotoId.emit(res.image)

    };
    reader.readAsDataURL(file);
  }

}

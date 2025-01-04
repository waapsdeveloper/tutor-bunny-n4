import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-sd-image-box',
  templateUrl: './sd-image-box.component.html',
  styleUrls: ['./sd-image-box.component.scss'],
})
export class SdImageBoxComponent extends BasePage implements OnInit {
  @Input('profilePhoto') profilePhoto: SafeUrl | undefined;
  @Input('photoId') photoId: SafeUrl | undefined;
  @Output('openGallery') openGallery: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('updateImage') updateImage: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('updatePhotoId') updatePhotoId: EventEmitter<any> =
    new EventEmitter<any>();

  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;

  @Input('image') image = '';

  sampleGalleryImage = '/assets/gallary.png';

  constructor(Injector: Injector) {
    super(Injector);
    this.initialize();
  }
  ngOnInit() {
    this.events.subscribe(
      'teacher-profile-second-screen-submit-call',
      (formData: any) => {
        if (!formData.image) {
          this.isRequired = true;
          this.errorText = 'Image is required to upload';
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        } else if (!formData.photo_id) {
          this.isRequired = true;
          this.errorText = 'Photo ID is required to upload';
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      },
      false
    );

    this.events.subscribe(
      'change-sample-image-to-this',
      (image: any) => {


        if (image) {
          this.sampleGalleryImage = image;
        }
      },
      false
    );

    this.events.subscribe('change-sample-gallery-to-this', (image) => {

      if (image.length == 0) {

        this.sampleGalleryImage = '/assets/gallary.png';
      } else {

        this.sampleGalleryImage = image[0].image;

      }
    });
  }

  initialize() {
    const user = this.users.getUser();
    this.profilePhoto = user.image;
    this.photoId = user.teacher.photo_id;

    this.getGalleryImages();
  }

  async getGalleryImages() {
    const user = this.users.getUser();
    const res = (await this.network.getImage(user.id)) as any;

    let list = res.result;
    if (list.length > 0) {
      let item = list[0];
      this.sampleGalleryImage = item.image;
    }
  }
  async handleFile(
    file: File,
    postFunction: (obj: any) => Promise<any>,
    emitFunction: (image: string) => void
  ) {
    const reader = new FileReader();
    reader.onload = async () => {
      let pmi = reader.result as string;

      // Resize if file size is greater than 1MB
      if (file.size > 1048576) {
        pmi = await this.imageService.resizeImage(file, 800, 800);
      }

      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi,
      };

      const res = await postFunction(obj);
      emitFunction(res.result.image);
    };
    reader.readAsDataURL(file);
  }

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFile(
      file,
      this.network.postProfileImage.bind(this.network),
      (image: string) => {
        this.profilePhoto = image;
        this.updateImage.emit(this.profilePhoto);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFile(
      file,
      this.network.postPhotoIdImage.bind(this.network),
      (image: string) => {
        this.photoId = image;
        this.updatePhotoId.emit(this.photoId);
      }
    );
  }
}

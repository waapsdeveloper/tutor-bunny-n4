import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sd-image-box',
  templateUrl: './sd-image-box.component.html',
  styleUrls: ['./sd-image-box.component.scss'],
})
export class SdImageBoxComponent  implements OnInit {

  profilePhoto: SafeUrl | undefined;
  photoId: SafeUrl | undefined;

  @Output('openGallery') openGallery: EventEmitter<any> = new EventEmitter<any>();



  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  onProfileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePhoto = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      console.log(this.profilePhoto);

    };
    reader.readAsDataURL(file);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.photoId = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      console.log(this.photoId);

    };
    reader.readAsDataURL(file);
  }

}

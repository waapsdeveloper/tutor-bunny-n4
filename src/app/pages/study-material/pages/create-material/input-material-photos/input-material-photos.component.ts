import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-material-photos',
  templateUrl: './input-material-photos.component.html',
  styleUrls: ['./input-material-photos.component.scss'],
})
export class InputMaterialPhotosComponent implements OnInit {
  image$;

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'At least 1 image is required';
  key = 'images';

  @Output() openPhotosView = new EventEmitter<any>();

  constructor(
    public createMaterialService: CreateMaterialService,
    public events: EventsService
  ) {
    this.createMaterialService.getImage().subscribe((value) => {
      this.image$ = value;

    });

  }

  ngOnInit() {
    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData) => {
        let v = formData[this.key];

        console.log(formData);

        if (!v || v == '' || v.length == 0) {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      },
      false
    );
  }

  openMaterialPhotos() {
    this.openPhotosView.emit();

    // this.nav.push('/material-photoss', {
    //   backUrl: '',
    //   gallary: 'true',
    //   title: 'Upload Material Photos',
    // });
  }

  setBackgroundImage(imageObj: { image: string }): string {
    const img = imageObj?.image;

    if (img) {
      // If base64, directly return it
      if (img.startsWith('data:')) {
        return `url('${img}')`;
      } else {
        // If it's a URL, wrap it with `url()`
        return `url('${img}')`;
      }
    }

    // Return a fallback, like an empty string or a default background
    return '';
  }
}

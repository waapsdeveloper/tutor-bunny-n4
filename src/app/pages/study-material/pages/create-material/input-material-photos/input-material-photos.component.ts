import { Component, Input, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-input-material-photos',
  templateUrl: './input-material-photos.component.html',
  styleUrls: ['./input-material-photos.component.scss'],
})
export class InputMaterialPhotosComponent implements OnInit {

  image$;

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'price is required';
  key = 'images';

  constructor(public createMaterialService: CreateMaterialService, public nav: NavService, public events: EventsService) {

    this.createMaterialService.getImage().subscribe((value) => {
      this.image$ = value;
    });
  }

  ngOnInit() {
    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData) => {
      let v = formData[this.key];
      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false);
  }

  openMaterialPhotos() {
    this.nav.push('/material-photoss', {
      backUrl: '',
      gallary: 'true',
      title: 'Upload Material Photos',
    });
  }

}

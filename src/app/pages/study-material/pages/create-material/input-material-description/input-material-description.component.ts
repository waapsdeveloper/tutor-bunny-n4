import { Component, Input, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-material-description',
  templateUrl: './input-material-description.component.html',
  styleUrls: ['./input-material-description.component.scss'],
})
export class InputMaterialDescriptionComponent  implements OnInit {

  description$: string = '';
  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'title is required';
  key = 'description';

  constructor(public createMaterialService: CreateMaterialService, public events: EventsService) {
    this.createMaterialService.getDescription().subscribe((value) => {
      this.description$ = value;
    });
  }

  async ngOnInit() {
    console.log("material description init");
    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData: any) => {
        let v = formData[this.key];
        if (this.key == 'description') {
          if (!v || v == '') {
            this.isRequired = true;
            setTimeout(() => {
              this.isRequired = false;
            }, 5000);
          }
          if (v && v.length < 250) {
            this.isRequired = true;
            this.errorText =
              'The Detail field should have minimum 250 characters';
            setTimeout(() => {
              this.isRequired = false;
            }, 5000);
          }
        }
      },
      false
    );

  }

  result(value, key) {
    this.createMaterialService.setDescription(value);
  }

}

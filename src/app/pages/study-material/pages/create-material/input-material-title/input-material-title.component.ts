import { Component, Input, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-material-title',
  templateUrl: './input-material-title.component.html',
  styleUrls: ['./input-material-title.component.scss'],
})
export class InputMaterialTitleComponent implements OnInit {

  title$: string = '';
  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'title is required';
  key = 'title';

  constructor(public createMaterialService: CreateMaterialService, public events: EventsService) {
    this.createMaterialService.getTitle().subscribe((value) => {
      this.title$ = value;
    });
  }

  async ngOnInit() {

    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData: any) => {

        let v = formData[this.key];
        if (v && this.key == 'title' && v.length > 50) {
          this.isRequired = true;
          this.errorText = 'The title field must be maximum 50 charecters';
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);

          return;
        }
        if (!v || v == '') {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      },
      false
    );

  }

  result(value, key) {
    this.createMaterialService.setTitle(value);
  }

}

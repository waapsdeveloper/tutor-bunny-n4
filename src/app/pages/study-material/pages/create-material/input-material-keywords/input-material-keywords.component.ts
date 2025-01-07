import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-keywords',
  templateUrl: './input-material-keywords.component.html',
  styleUrls: ['./input-material-keywords.component.scss'],
})
export class InputMaterialKeywordsComponent  implements OnInit {

  keywords$: any[] = [];

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'Atleast 1 keyword is required';
  key = 'keyword';

  constructor(public createMaterialService: CreateMaterialService, public events: EventsService) {
    this.createMaterialService.getKeywords().subscribe(keywords => {
      this.keywords$ = keywords;

    });
  }

  ngOnInit() {


    this.events.subscribe('teacher-study-material-second-screen-submit-call', (formData) => {

      if (!formData.keywords || formData.keywords == '' || formData.keywords == 0) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

  }

  result(value, key) {

  }

}

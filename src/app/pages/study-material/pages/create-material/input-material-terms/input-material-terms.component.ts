import { Component, Input, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-material-terms',
  templateUrl: './input-material-terms.component.html',
  styleUrls: ['./input-material-terms.component.scss'],
})
export class InputMaterialTermsComponent implements OnInit {
  hideTerms = false;
  terms$;

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'Please accept terms and conditions';
  key = 'terms';

  constructor(
    public createMaterialService: CreateMaterialService,
    public events: EventsService
  ) {
    this.createMaterialService.getTerms().subscribe((value) => {
      this.terms$ = value;
    });
  }

  ngOnInit() {
    this.events.subscribe(
      'teacher-study-material-second-screen-submit-call',
      (formData) => {

        let v = formData[this.key];

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
    this.createMaterialService.setTerms(value);
  }
}

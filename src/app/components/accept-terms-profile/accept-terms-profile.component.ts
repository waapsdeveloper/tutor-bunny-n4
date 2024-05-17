import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-accept-terms-profile',
  templateUrl: './accept-terms-profile.component.html',
  styleUrls: ['./accept-terms-profile.component.scss'],
})
export class AcceptTermsProfileComponent implements OnInit {
  @Input('terms') terms = false;
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private events: EventsService) { }

  ngOnInit() {

    this.events.subscribe('teacher-profile-second-screen-submit-call', (formData: any) => {

      let v = formData[this.key];

      console.log(v, this.key);


      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);

        return;
      }



    }, false)

    this.events.subscribe('student-profile-first-screen-submit-call', (formData: any) => {

      let v = formData[this.key];

      console.log(v, this.key);


      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);

        return;
      }



    }, false)

  }
}

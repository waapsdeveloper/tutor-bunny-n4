import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-input-box',
  templateUrl: './sd-input-box.component.html',
  styleUrls: ['./sd-input-box.component.scss'],
})
export class SdInputBoxComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() isReadOnly = false;
  @Input('key') key = '';
  @Input() minlength;
  @Input() maxlength;
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;
  @Input() image = '';
  showPassword = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('showTogglePassword') showTogglePassword = false;
  togglePassword = true;

  constructor(private events: EventsService) {}

  ngOnInit() {
    this.events.subscribe(
      'teacher-profile-second-screen-submit-call',
      (formData: any) => {
        let v = formData[this.key];
        if (!v || v == '') {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }

        if (v && v.length < 50 && this.key == 'title') {
          this.isRequired = true;
          this.errorText = 'The title field should have minimum 50 characters';
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      },
      false
    );

    this.events.subscribe(
      'teacher-profile-first-screen-submit-call',
      (formData: any) => {
        let v = formData[this.key];

        if(this.key == 'title' || this.key == 'hourly_rate'){
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

    this.events.subscribe(
      'student-profile-first-screen-submit-call',
      (formData: any) => {
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

    this.events.subscribe(
      'teacher-course-first-screen-submit-call',
      (formData: any) => {
        if (
          this.key == 'price' ||
          this.key == 'duration' ||
          this.key == 'lesson'
        ) {
          return;
        }

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

    this.events.subscribe(
      'teacher-course-second-screen-submit-call',
      (formData: any) => {
        if (
          this.key != 'price' &&
          this.key != 'duration' &&
          this.key != 'lesson'
        ) {
          return;
        }

        let v = formData[this.key];

        if (!v || v == '') {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      }
    );

    this.events.subscribe(
      'teacher-profile-third-screen-submit-call',
      (formData: any) => {
        if (this.key != 'hourly_rate') {
          return;
        }

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

  showPasword(key) {
    this.showPassword = key;
  }
  result($event) {
    let v = $event.target.value;

    if (this.key == 'zip_code') {
      let numericValue: string = v.replace(/\D/g, '');
      ($event.target as HTMLInputElement).value = numericValue;
    }

    if (this.key == 'title') {
      let maxValue: string = v.substring(0, this.maxlength);
      ($event.target as HTMLInputElement).value = maxValue;
    }

    // Check if the key is 'phone_number' and limit the input to 15 characters
    if (this.key == 'phone_number' && v.length > 15) {
      ($event.target as HTMLInputElement).value = v.slice(0, 15);
      v = ($event.target as HTMLInputElement).value;
    }

    if (this.key == 'from_age') {
      let maxValue: string = v.substring(0, 2);
      ($event.target as HTMLInputElement).value = maxValue;
    }

    if (this.key == 'to_age') {
      let maxValue: string = v.substring(0, 2);
      ($event.target as HTMLInputElement).value = maxValue;
    }

    if (!this.isReadOnly) {
      this.onChange.emit(v);
    }
  }

  onPasteHandler($event) {
    const v = $event.clipboardData.getData('text/plain');
    // let obj = {
    //   target: {
    //     value: v
    //   }
    // }

    // this.result(obj);
  }

  modelChange($event) {
    let v = $event;
    this.onChange.emit(v);
  }

  clearInput() {
    this.inputText = '';
    this.onChange.emit('');
  }

  toggleShowPasword(flag) {
    this.togglePassword = !this.togglePassword;
    this.type = this.togglePassword ? 'password' : 'text';
  }
}

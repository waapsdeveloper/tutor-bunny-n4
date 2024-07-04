import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-date-box',
  templateUrl: './sd-date-box.component.html',
  styleUrls: ['./sd-date-box.component.scss'],
})
export class SdDateBoxComponent implements OnInit {
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
  @Input() image = ''
  showPassword = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('showTogglePassword') showTogglePassword = false;
  togglePassword = true;
  selecteddates = {
    strat_date: '',
    end_date: ''
  }

  constructor(private events: EventsService) { }

  ngOnInit() {


    this.events.subscribe('teacher-course-second-screen-submit-call', (formData: any) => {

      if (this.key == 'price' || this.key == 'duration' || this.key == 'lesson') {
        return;
      }

      let v = formData[this.key];

      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false);

  }

  showPasword(key) {

    this.showPassword = key;

  }
  result($event) {
    let v = $event.target.value;

    if (!this.isReadOnly) {
      this.onChange.emit(v);
    }
  }



  modelChange($event) {
    let v = $event;
    this.onChange.emit(v)
  }


  clearInput() {
    this.inputText = '';
    this.onChange.emit('');
  }

  toggleShowPasword(flag) {
    this.togglePassword = !this.togglePassword
    console.log(this.togglePassword)
    this.type = this.togglePassword ? 'password' : 'text'
  }
}

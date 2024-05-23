import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-textarea-about',
  templateUrl: './sd-textarea-about.component.html',
  styleUrls: ['./sd-textarea-about.component.scss'],
})
export class SdTextareaAboutComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() minlength;
  @Input() maxlength;
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor(private events: EventsService) {
  }
  ngOnInit() {
    this.events.subscribe('teacher-profile-first-screen-submit-call', (formData: any) => {
      if (this.key == 'title' || this.key == 'description') {
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

    this.events.subscribe('teacher-profile-second-screen-submit-call', (formData: any) => {
      let v = formData[this.key];
      if (this.key == 'description') {
        if (!v || v == '') {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
          return
        }

        if (v && v.length < 400) {
          this.isRequired = true;
          this.errorText = 'The About field should have minimum 400 characters'
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      }

    }, false)
  }


  result($event) {
    let v = $event.target.value;

    if (this.key == 'description') {
      let maxValue: string = v.substring(0, 400);
      ($event.target as HTMLInputElement).value = maxValue;
    }

    this.onChange.emit(v)
  }
  clearInput() {
    this.inputText = '';
    this.onChange.emit('')
  }

  onPasteHandler($event){
    const v = $event.clipboardData.getData('text/plain');
    // let obj = {
    //   target: {
    //     value: v
    //   }
    // }

    // this.result(obj);

  }

  modelChange($event){
    console.log($event);
    let v = $event;
    this.onChange.emit(v)
  }
}

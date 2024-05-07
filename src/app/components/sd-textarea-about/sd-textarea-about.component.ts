import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-textarea-about',
  templateUrl: './sd-textarea-about.component.html',
  styleUrls: ['./sd-textarea-about.component.scss'],
})
export class SdTextareaAboutComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor(private events: EventsService) {}

  ngOnInit() {
    this.events.subscribe('teacher-profile-first-screen-submit-call', (formData: any) => {

      let v = formData[this.key];
      console.log(v)

      if(!v || v == ''){
        this.isRequired = true;
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)
  }

  result($event){
    let v = $event.target.value;
    this.onChange.emit(v)
  }


  clearInput(){
    this.inputText = '';
    this.onChange.emit('')
  }
}

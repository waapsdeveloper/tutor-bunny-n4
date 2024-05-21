import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-textarea-box',
  templateUrl: './sd-textarea-box.component.html',
  styleUrls: ['./sd-textarea-box.component.scss'],
})
export class SdTextareaBoxComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

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

  onPasteHandler($event){
    const v = $event.clipboardData.getData('text/plain');
    console.log(v);
    let obj = {
      target: {
        value: v
      }
    }

    this.result(obj);

  }
}

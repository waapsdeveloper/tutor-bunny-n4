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
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();



  constructor(private events: EventsService) {

  }

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
    if(!this.isReadOnly){
      this.onChange.emit(v)
    }

  }

  clearInput(){
    this.inputText = '';
    this.onChange.emit('')
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sd-textarea-box',
  templateUrl: './sd-textarea-box.component.html',
  styleUrls: ['./sd-textarea-box.component.scss'],
})
export class SdTextareaBoxComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor() {}

  ngOnInit() {}

  result($event){
    let v = $event.target.value;
    this.onChange.emit(v)
  }
}

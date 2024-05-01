import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor() {}

  ngOnInit() {}

  result($event){
    let v = $event.target.value;
    if(!this.isReadOnly){
      this.onChange.emit(v)
    }

  }
}

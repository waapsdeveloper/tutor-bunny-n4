import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sd-year-box',
  templateUrl: './sd-year-box.component.html',
  styleUrls: ['./sd-year-box.component.scss'],
})
export class SdYearBoxComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() isReadOnly = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  result($event) {
    let v = $event.target.value;
    console.log(v);
    let m = moment(v).format('Y-MM-DD');
    console.log(m);
    // if (!this.isReadOnly) {
    this.onChange.emit(m);
    // }
  }

  openDateSelection() {}
}

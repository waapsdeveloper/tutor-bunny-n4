import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sd-year-box',
  templateUrl: './sd-year-box.component.html',
  styleUrls: ['./sd-year-box.component.scss'],
})
export class SdYearBoxComponent implements OnInit, AfterViewInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() isReadOnly = false;
  @ViewChild('dob') dob: ElementRef;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngAfterViewInit(): void {
    // Access the value of ion-datetime
    if(this.dob){
      const dateTimeValue = this.dob.nativeElement.value;
      console.log(dateTimeValue); // Log the current value
    }

  }

  ngOnInit() {

  }

  result($event) {
    let v = $event.target.value;
    console.log("date-set", v)
    let m = moment(v).format('Y-MM-DD');
    console.log(m);
    // if (!this.isReadOnly) {
    this.onChange.emit(m);
    // }
  }

  openDateSelection() {}
}

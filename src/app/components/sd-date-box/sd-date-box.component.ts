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
  @Input() image = '';
  showPassword = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('showTogglePassword') showTogglePassword = false;
  togglePassword = true;
  startDate;
  endDate;
  dateError = '';

  constructor(private events: EventsService) { }

  ngOnInit() {

  }



  setStartTime($event) {
    this.startDate = $event;
    this.validateDates();
  }

  setEndTime($event) {
    this.endDate = $event;
    this.validateDates();
  }

  validateDates() {
    if (this.startDate && this.endDate && new Date(this.endDate) < new Date(this.startDate)) {
      this.dateError = 'End date cannot be earlier than start date';
    } else {
      this.dateError = '';
    }
  }
}

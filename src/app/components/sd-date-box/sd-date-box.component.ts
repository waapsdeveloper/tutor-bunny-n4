import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonModal } from '@ionic/angular';
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

  @Input() start_date = '';
  @Input() end_date = '';
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

  selectedDates = {
    start_date: '',
    end_date: ''
  }

  constructor(private events: EventsService) {

  }

  ngOnInit() {

    this.events.subscribe('teacher-course-first-screen-submit-call', (formData: any) => {
      this.startDate = this.start_date;
      this.endDate = this.end_date
    }
    )

  }



  setStartTime($event) {
    this.startDate = $event;

    this.validateDates();
    if (this.startDate) {
      this.selectedDates.start_date = this.startDate;
      this.onChange.emit(this.selectedDates);
    }
    else {
      return
    }
  }
  closeDateModal(modal: IonModal) {
    modal.dismiss();
  }

  setEndTime($event) {
    this.endDate = $event;
    this.validateDates();
    if (this.startDate) {
      this.selectedDates.end_date = this.endDate;
      this.onChange.emit(this.selectedDates);
    }
    else {
      return
    }
  }

  validateDates() {
    if (this.startDate && this.endDate && new Date(this.endDate) < new Date(this.startDate)) {
      this.dateError = 'End date cannot be earlier than start date';
    } else {
      this.dateError = '';
    }
  }
}

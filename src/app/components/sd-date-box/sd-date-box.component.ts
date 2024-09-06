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
  data;
  dateError = '';

  selectedDates = {
    start_date: '',
    end_date: ''
  }

  constructor(private events: EventsService) {

  }

  ngOnInit() {

    this.events.subscribe('teacher-course-first-screen-submit-call', (formData: any) => {

      this.startDate = formData.start_date;
      this.endDate = formData.end_date
    })

  }




  closeDateModal($event, type, modal: IonModal) {
    let v = $event.detail.value;
    if (type == 'start_date') {
      this.selectedDates.start_date = v;
      this.validateDates();
    }
    if (type == 'end_date') {
      this.selectedDates.end_date = v;
      this.validateDates();
    }
    this.onChange.emit(this.selectedDates)
    modal.dismiss();
  }


  validateDates() {
    if (this.selectedDates.start_date && this.selectedDates.end_date && new Date(this.selectedDates.end_date) < new Date(this.selectedDates.start_date)) {

      this.dateError = 'End date cannot be earlier than start date';
    } else {
      this.dateError = '';
    }
  }
}

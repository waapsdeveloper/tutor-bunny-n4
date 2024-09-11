import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-add-dates',
  templateUrl: './add-dates.page.html',
  styleUrls: ['./add-dates.page.scss'],
})
export class AddDatesPage extends BasePage implements OnInit {

  day: string = '';
  startDateTime: string = '';
  endDateTime: string = '';

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }

  swapMode(selectedDay: string) {
    this.day = selectedDay;
  }

  onDateTimeChange(event: any, type: string) {
    if (type === 'start') {
      this.startDateTime = event.detail.value;
    } else if (type === 'end') {
      this.endDateTime = event.detail.value;
    }
  }

  async selectedDates() {

    let courseId = localStorage.getItem('course_Id');
    const selectedObj = {
      day: this.day,
      start_date: this.startDateTime,
      end_date: this.endDateTime,
      course_id: courseId
    };
    let res = await this.network.AddSchedule(selectedObj);

    this.modals.dismiss(selectedObj)
  }
}

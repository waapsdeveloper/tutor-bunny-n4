import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent extends BasePage implements OnInit {
  start_time: string[] = [];
  end_time: string[] = [];


  schedule = [{ day: '', start_date: '', end_date: '', course_id: '' }];

  constructor(injecter: Injector) {
    super(injecter);
  }

  async ngOnInit() {
    this.start_time = await this.generateTimes();
    this.end_time = await this.generateTimes();
    console.log(this.start_time);
  }

  back() {
    this.modals.dismiss();
  }

  generateTimes(): string[] {
    const times = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 48; i++) {
      const hours = start.getHours().toString().padStart(2, '0');
      const minutes = start.getMinutes().toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
      start.setMinutes(start.getMinutes() + 30);
    }

    return times;
  }

  // Add method to add more schedule items
  addMoreSchedule() {
    this.schedule.push({ day: '', start_date: '', end_date: '', course_id: '' });
  }
  async submit() {
    let courseId = localStorage.getItem('course_Id');
    this.schedule.forEach(item => {
      item.course_id = courseId;
    });
    console.log(this.schedule);
    let res = await this.network.AddSchedule(this.schedule);
    console.log(res);
    if (res.status == 200) {
      this.modals.dismiss();
    }

  }

  // Method to handle the ionChange event
  onTimeChange(event: any) {
    console.log('Selected time:', event.detail.value);
    this.schedule['start_date'] = event.detail.value;
  }
  onEndTimeChange(event: any) {
    console.log('Selected time:', event.detail.value);
    this.schedule['end_date'] = event.detail.value;

  }
  onDaySelect(event: any) {
    console.log('Selected time:', event.detail.value);
    this.schedule['day'] = event.detail.value;

  }
}

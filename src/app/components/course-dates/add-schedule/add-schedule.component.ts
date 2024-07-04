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
  courseType;
  date: '';

  schedule = [{ day: '', start_date: '', end_date: '', course_id: ''}];

  constructor(injecter: Injector) {
    super(injecter);
  }

  async ngOnInit() {
    this.courseType = localStorage.getItem('courseType');
    console.log(this.courseType);

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
      const hours = start.getHours();
      const minutes = start.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
      times.push(`${formattedHours}:${minutes} ${ampm}`);
      start.setMinutes(start.getMinutes() + 30);
    }
  
    return times;
  }

  addMoreSchedule() {
    this.schedule.push({ day: '', start_date: '', end_date: '', course_id: ''});
  }

  async submit() {
    let courseId = localStorage.getItem('course_Id');
    this.schedule.forEach(item => {
      item.course_id = courseId;
      item.day = this.date
    });
    console.log(this.schedule);
    let res = await this.network.AddSchedule(this.schedule);
    console.log(res);

    if (res.status == 200) {
      this.modals.dismiss();
    }
  }
}

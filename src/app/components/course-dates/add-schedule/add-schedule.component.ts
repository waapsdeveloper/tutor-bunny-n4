import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent extends BasePage implements OnInit, OnDestroy {
  start_time: string[] = [];
  end_time: string[] = [];
  @Input() courseId = {};
  courseType: any;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  error = false;
  date = '';
  course_Id: any;
  submitPressed = false;
  schedule = [{ day: '', start_date: '', end_date: '', course_id: '', id: '' }];

  constructor(injecter: Injector) {
    super(injecter);
    this.initialize();
  }

  ngOnDestroy(): void {
    if (!this.submitPressed) {
      this.submit()
    };

  }

  async ngOnInit() {
    this.submitPressed = false;
    this.courseType = localStorage.getItem('courseType');
    this.start_time = await this.generateTimes();
    this.end_time = await this.generateTimes();
    await this.callApi(this.course_Id);
    if (this.schedule.length === 0) {
      this.schedule.push({ day: '', start_date: '', end_date: '', course_id: '', id: '' });
    }
  }

  async initialize() {
    let course_Id = localStorage.getItem('course_Id');
    this.course_Id = course_Id;
    if (this.course_Id) {
      await this.callApi(this.course_Id);
    }
  }

  async callApi(id: any) {
    if (id) {
      let res = await this.network.getSchedule(id);
      this.schedule = res.result;
      this.onChange.emit(this.schedule);
    }
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
    this.schedule.push({ day: '', start_date: '', end_date: '', course_id: '', id: '' });
  }

  async submit() {
    this.submitPressed = true;
    let courseId = localStorage.getItem('course_Id');
    for (let item of this.schedule) {
      if (!item.day || !item.start_date || !item.end_date) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        return;
      }
    }
    this.schedule.forEach(item => {
      item.course_id = courseId;
    });
    let res = await this.network.AddSchedule(this.schedule);
    if (res.status === 200) {
      this.modals.dismiss();
    }
  }

  async deleteShedule(id, index) {


    this.schedule.splice(index, 1);

    if (id) {
      let res = await this.network.deleteShedule(id);
      // await this.callApi(this.course_Id);
    }

  }

  setDateErt($event, i) {

    let v = $event.detail.value;
    if (v) {
      let ar = v.split('T');
      if (ar && ar[0]) {
        this.schedule[i].day = ar[0];
      }


    }
  }
  closeDateModal(modal: IonModal) {
    modal.dismiss();
  }


}

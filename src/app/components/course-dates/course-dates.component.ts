import { Component, Injector, OnInit } from '@angular/core';
import { AddDatesPage } from 'src/app/add-dates/add-dates.page';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-dates',
  templateUrl: './course-dates.component.html',
  styleUrls: ['./course-dates.component.scss'],
})
export class CourseDatesComponent extends BasePage  implements OnInit {

  schedules = [];


  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  async addCourseDate(){
    let res = await this.modals.present(AddDatesPage)
    console.log(res);

    let data = res.data

    this.schedules.push(data)

  }
  editSchedule(item){
    this.modals.present(AddDatesPage, item)
  }


}

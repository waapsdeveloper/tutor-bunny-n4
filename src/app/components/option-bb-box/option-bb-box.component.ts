import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from 'src/app/pages/teacher-dashboard/create-course/create-course.page';

@Component({
  selector: 'app-option-bb-box',
  templateUrl: './option-bb-box.component.html',
  styleUrls: ['./option-bb-box.component.scss'],
})
export class OptionBbBoxComponent extends BasePage implements OnInit {

  list = [
    {
      nbl: 'Trail',
      colorClass: '',
      img: 'assets/svg/trail-light.svg',

    },
    {
      nbl: 'Create Course',
      colorClass: '',
      img: 'assets/icon/cradd.svg'
    },
    {
      nbl: 'Buy Credit',
      colorClass: '',
      img: 'assets/icon/buyc.svg'
    },
  ]
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() { }

  async createCourse() {
    let res = await this.modals.present(CreateCoursePage, {}, "", 0.7);


    if (res.data.title) {


      const params = {
        backUrl: '/tabs/teacher-dashboard',
        title: res.data.title,
        type: res.data.type,

      };

      this.nav.push('/course-form', params)
    }
  }

  goToTrialReq() {
    this.nav.push('my-students')
  }

  goToMyStudents(){
    this.nav.push('my-students')
  }

}

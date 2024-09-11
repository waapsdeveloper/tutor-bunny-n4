import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage extends BasePage implements OnInit {

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }

  back() {
    this.modals.dismiss()
  }
  setcourseType(key, title) {

    let obj = {
      type: key,
      title: title
    }


    this.modals.dismiss(obj)

  }

}

import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

interface CourseType {
  type: string;
  title: string;
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage extends BasePage {
  analyticsService: any;

  constructor(injector: Injector) {
    super(injector);
  }



  back(): void {
    try {
      this.modals.dismiss();
    } catch (error) {
      console.error('Error while dismissing modal:', error);
    }
  }

  setcourseType(key: string, title: string): void {
    const obj: CourseType = { type: key, title: title };
    try {
      this.modals.dismiss(obj);
    } catch (error) {
      console.error('Error while dismissing modal with data:', error);
    }
  }

}


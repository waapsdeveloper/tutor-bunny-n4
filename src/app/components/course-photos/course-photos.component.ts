import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-photos',
  templateUrl: './course-photos.component.html',
  styleUrls: ['./course-photos.component.scss'],
})
export class CoursePhotosComponent extends BasePage implements OnInit {

  private _course_Id: any;

  @Input('course_Id')
  public get course_Id() {
    return this._course_Id;
  };

  public set course_Id(value: any) {
    this._course_Id = value;
    if(value){
      this.getCourseImages(value)
    }

  }
  courseImages

  constructor(injector:Injector) {
    super(injector)

   }

  ngOnInit() {}

  async getCourseImages(id){
    let obj = {
      course_id: id
    }
    let res  = await this.network.getCourseImages(obj) as any;
    this.courseImages = res.result;
    console.log(this.courseImages);

  }

}

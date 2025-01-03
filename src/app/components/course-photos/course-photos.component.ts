import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-course-photos',
  templateUrl: './course-photos.component.html',
  styleUrls: ['./course-photos.component.scss'],
})
export class CoursePhotosComponent {
  private _course_Id: any;
  courseImages: any[] = [];

  @Input('course_Id')
  public get course_Id() {
    return this._course_Id;
  }

  public set course_Id(value: any) {
    this._course_Id = value;
    if (value) {
      this.getCourseImages(value);
    }
  }

  constructor(public network: NetworkService) {}

  async getCourseImages(id) {
    let obj = {
      course_id: id,
    };
    let res = (await this.network.getCourseImages(obj)) as any;
    this.courseImages = res.result;
    console.log(this.courseImages);
  }
}

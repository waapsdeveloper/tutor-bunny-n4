import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-course-photos',
  templateUrl: './course-photos.component.html',
  styleUrls: ['./course-photos.component.scss'],
})
export class CoursePhotosComponent {
  private _courseId: any;
  courseImages: any[] = [];

  activeIndex = 0;

  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  @Input('courseId')
  public get courseId() {
    return this._courseId;
  }

  public set courseId(value: any) {
    this._courseId = value;
    if (value) {
      this.getCourseImages(value);
    }
  }

  constructor(public network: NetworkService, private cdr: ChangeDetectorRef) {}

  async getCourseImages(id) {
    let obj = {
      course_id: id,
    };
    let res = (await this.network.getCourseImages(obj)) as any;
    this.courseImages = res.result;

  }

  get svgWidth(): number {
    return this.courseImages.length * 10 + 8; // Dynamic width based on the number of circles
  }

  get viewBox(): string {
    return `0 0 ${this.svgWidth} 16`; // Dynamic viewBox to match the SVG's width
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    this.cdr.detectChanges();
  }

}

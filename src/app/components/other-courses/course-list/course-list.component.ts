import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  list;
  course
  @ViewChild('slides', { static: false }) slides: any;
  constructor(private _sanitizer: DomSanitizer, injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    this.list = await this.network.getCourseList(user.id) as any[];
    console.log(this.list);

    this.course = this.list.result

  }

  getLink(item) {
    const safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(item.link);
    return safeURL;
  }
  async onSlideChange() {

    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }
  oepnDeatils(item) {
    console.log(item);

    const params = {
      id: item.id,
      backUrl: '/tabs/courses'
    }
    console.log(params);
    this.nav.push('/tabs/course-detail', params)
    


  }
}

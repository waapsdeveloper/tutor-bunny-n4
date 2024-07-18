import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  @Input() list: any[] = [];
  course
  @Input() item
  @ViewChild('slides', { static: false }) slides: any;
  constructor(private _sanitizer: DomSanitizer, injector: Injector) {
    super(injector)
  }
  ngOnInit() {}

  oepnDeatils(item) {

    const params = {
      id: item.id,
      backUrl: '/tabs/courses'
    }
    this.nav.push('/tabs/course-detail', params)

  }

}

import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent extends BasePage implements OnInit {


  list;
  count;
  user
  page: number = 1;
  @Output('listData') listData: EventEmitter<any> = new EventEmitter<any>();

  last_page = -1;
  constructor(injector: Injector) {
    super(injector)
  }


  ngOnInit() {

    this.events.subscribe('data-for-other-corses', (data: any) => {
      console.log(data);

      this.user = data.user;
      this.getCourses(data);

    }
    )

  }
  async initialize() {

  }

  getCourses(course: any) {
    return new Promise(async resolve => {

      let obj = {
        user_id: this.user.id,
        except_course_id : course.id
      };

      const res = await this.network.getOtherCourseList(obj) as any;
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      this.count = res.result.total

      this.list = data.data;
      this.listData.emit(data);
      resolve(true);
    });
  }

  async oepnDeatils(item) {

    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    let res = await this.nav.push('student-course-detail', params)

  }

}

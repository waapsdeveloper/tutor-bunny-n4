import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { TeacherReviewsComponent } from './course-list/teacher-reviews/teacher-reviews.component';

@Component({
  selector: 'app-req-course-list',
  templateUrl: './req-course-list.component.html',
  styleUrls: ['./req-course-list.component.scss'],
})
export class ReqCourseListComponent extends BasePage implements OnInit {
  list;
  review_course = {
    user_id: null,
    course_id: null,
  };
  bloc;
  params;
  @Output('number') number: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private globalCourses: GlobalCoursesService,
    public chats: ChatService
  ) {
    super(injector);
    this.callApi();
  }

  async ngOnInit() {
    this.review_course = this.chats.review_course;
    console.log(this.review_course);
    if (this.review_course.course_id) {
      let item = (await this.globalCourses.getcourseById(
        this.review_course.course_id
      )) as any;
      console.log(item);

      let res = (await this.modals.present(
        TeacherReviewsComponent,
        { item },
        '',
        0.7
      )) as any;
      this.callApi();
    }
  }

  async callApi() {
    let user = this.users.getUser();

    let res = await this.network.getAllReqCourses(user.id);
    this.list = res.result.data;
    this.number.emit(res.result.total);
  }

  async refreshPage(event) {
    let user = this.users.getUser();

    let res = await this.network.getAllReqCourses(user.id);
    this.number.emit(res.result.total);

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}

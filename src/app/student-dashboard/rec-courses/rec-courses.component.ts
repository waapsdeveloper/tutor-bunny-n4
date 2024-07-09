import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { log } from 'console';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-rec-courses',
  templateUrl: './rec-courses.component.html',
  styleUrls: ['./rec-courses.component.scss'],
})
export class RecCoursesComponent extends BasePage implements OnInit {

  list: any[] = [];
  page: number = 1;
  last_page = -1;
  course;
  search: string = '';
  user;
  data: any;
  loading = false;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {
    this.events.subscribe("show-list-of-fav-courses", (data) => {
      console.log("show liked", data);
      this.getCourses('', 1, data.liked);
    });
    this.user = this.users.getUser();
    this.courseReceivedViaPusher();
  }

  courseReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    console.log("sdfsf");

    this.events.subscribe('course-received-via-pusher', this.updateCourseList.bind(this));
  }

  async updateCourseList(data: any) {
    console.log(data['course_Id']);

    let course_Id = data.course_id;
    console.log(course_Id);

    if (course_Id) {
      let res = await this.network.getcourseById(course_Id) as any;
      console.log(res);
      this.course = res.course;

      // Add the received course to the list or update if it exists
      if (this.course) {
        const index = this.list.findIndex(c => c.id === this.course.id);
        if (index !== -1) {
          this.list[index] = this.course;
        } else {
          this.list = [this.course, ...this.list];
        }
      }
    }
  }

  async initialize() {
    this.getCourses('', 1);
  }

  getCourses(search = '', page = 1, liked = false) {
    return new Promise(async resolve => {
      let obj = {
        search: search,
        page: page,
        liked: liked
      };

      const res = await this.network.getAllCourses(obj) as any;
      console.log(res);
      const data = res.result;
      this.page = data.current_page;
      this.last_page = data.last_page;

      if (page === 1) {
        this.list = data.data;
      } else {
        this.list = [...this.list, ...data.data];
      }

      // If a course was received, add it to the list or update if it exists
      if (this.course && page === 1) {
        const index = this.list.findIndex(c => c.id === this.course.id);
        if (index !== -1) {
          this.list[index] = this.course;
        } else {
          this.list = [this.course, ...this.list];
        }
      }

      resolve(true);
    });
  }

  async onIonInfinite(ev) {
    this.loading = true;
    if (this.page <= this.last_page) {
      const np = this.page + 1;
      console.log(np);

      await this.getCourses('', np);
    }
    this.loading = false;
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  reloadList() {
    this.getCourses('', 1);
  }
}

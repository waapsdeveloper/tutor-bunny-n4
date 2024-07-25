import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-rec-courses',
  templateUrl: './rec-courses.component.html',
  styleUrls: ['./rec-courses.component.scss'],
})
export class RecCoursesComponent extends BasePage  { // implements OnInit

  // list: any[] = [];
  // page: number = 1;
  // last_page = -1;
  // course;
  // search: string = '';
  // courseId
  // user;
  // blocked;
  // data: any;
  // loading = false;

  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
    // this.user = this.users.getUser();
    // this.initialize();
  }

  // ngOnInit() {
  //   // this.trialsReceivedViaPusher();
  //   // this.events.subscribe('Update-Fv-Screen', (data) => {
  //   //   this.getCourses('', 1);
  //   // })
  //   // this.events.subscribe("show-list-of-fav-courses", () => {
  //   //   this.initialize();
  //   // });
  //   // this.courseReceivedViaPusher();
  // }
  // trialsReceivedViaPusher() {
  //   this.events.registerPusherEvent(this.user.id);
  //   this.events.subscribe('trials-received-via-pusher', this.updateTrailsList.bind(this));
  // }
  // async updateTrailsList(data: any) {
  //   this.courseId = data.course_id;
  //   if (this.courseId) {
  //     this.getCourses('', 1);
  //     const index = this.list.findIndex(c => c.id === this.courseId);
  //   }
  // }

  async handleRefresh(event) {
    // await this.getCourses('', 1);
    await this.globalCourses.getCoursesFromApi('', 1)
    event.target.complete();
  }

  // courseReceivedViaPusher() {
  //   this.events.registerPusherEvent(this.user.id);
  //   this.events.subscribe('course-received-via-pusher', this.updateCourseList.bind(this));
  // }
  // async updateCourseList(data: any) {
  //   let course_Id = data.course_id;
  //   if (course_Id) {
  //     let res = await this.network.getcourseById(course_Id) as any;
  //     this.course = res.course;
  //     if (this.course) {
  //       const index = this.list.findIndex(c => c.id === this.course.id);
  //       if (index !== -1) {
  //         this.list[index] = this.course;
  //       } else {
  //         this.list = [this.course, ...this.list];
  //       }
  //     }
  //   }
  // }
  // async initialize() {
  //   this.getCourses('', 1);
  // }
  // async getCourses(search = '', page = 1, liked = false) {
  //   const res = await this.globalCourses.getAllCourses()
  //   return new Promise(async resolve => {
  //     // if (this.course && page === 1) {
  //     //   const index = this.list.findIndex(c => c.id === this.course.id);
  //     //   if (index !== -1) {
  //     //     this.list[index] = this.course;
  //     //   } else {
  //     //     this.list = [this.course, ...this.list];
  //     //   }
  //     // }
  //     resolve(true);
  //   });
  // }

  async onIonInfinite(ev) {
    // this.loading = true;
    if (this.globalCourses.page <= this.globalCourses.last_page) {
      const np = this.globalCourses.page + 1;
      await this.globalCourses.getCoursesFromApi('', np);
    }
    // this.loading = false;
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  // reloadList() {
  //   this.getCourses('', 1);
  // }
}

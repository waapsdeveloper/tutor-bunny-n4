import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage extends BasePage implements OnInit {
  user;
  search = '';
  page = 1;
  last_page = -1;
  list: any[] = [];
  course;
  status;

  constructor(injector: Injector) {
    super(injector)
    // this.initialize()
  }

  ngOnInit() {

    this.user = this.users.getUser();
    this.getCourses('', 1)

    // this.events.subscribe('initilize-the-list', (res) => {
    //   this.initialize()
    // });

  }

  async getCourses(search = '', page = 1) {

    return new Promise( async resolve => {
      let obj = {
        search: search,
        page: page
      }
      const res = await this.network.getMyCourseList(obj) as any;
      console.log(res)
      const result = res.result;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result["data"];
      } else {
        this.list = [...this.list, ...result["data"]]
      }

      resolve(true)
    })


  }

  onCourseDeleted(courseId: number) {
    this.list = this.list.filter(course => course.id !== courseId);
  }
  courseActive() {
    // this.initialize()
  }
  courseInctive() {
    // this.initialize()

  }

  async onIonInfinite(ev) {

    console.log(this.last_page , this.page, this.last_page < this.page)
    if(this.last_page > this.page){
      await this.getCourses(this.search, this.page + 1);
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}

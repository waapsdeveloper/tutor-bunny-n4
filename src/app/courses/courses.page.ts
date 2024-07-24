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
  categoryId;
  pageTitle = 'My Courses'

  constructor(injector: Injector) {
    super(injector)
    // this.initialize()
  }

  ngOnInit() {

    this.user = this.users.getUser();
    this.getCourses('', 1)

    this.events.subscribe('initilize-the-list', (res) => {
      this.getCourses('', 1)
      // this.initialize()
    });

  }

  ionViewWillEnter() {
    const params = this.nav.getQueryParams() as any
    if (params.category_id) {
      this.categoryId = params.category_id;
      this.pageTitle = 'Courses'
      this.search = '';
      this.getCourses(this.search, 1)
    }

  }

  async getCourses(search = '', page = 1) {
    return new Promise(async resolve => {
      let obj = {
        search: search,
        page: page
      }

      if (this.categoryId) {
        obj['category_id'] = this.categoryId
      }
      const res = this.categoryId ? await this.network.getOtherCourseList(obj) as any : await this.network.getMyCourseList(obj) as any;
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
    this.getCourses(this.search, 1)
  }
  courseActive() {
    // this.initialize()
  }
  courseInctive() {
    // this.initialize()

  }

  courseEdit() {

    this.getCourses(this.search, 1)
  }

  openDetails(obj) {

    const params = {
      id: obj.id,
      backUrl: '/tabs/courses'
    }
    this.nav.push('/tabs/course-detail', params)

  }

  async doSearch($event) {
    await this.getCourses(this.search, 1);
  }

  async handleRefresh(event) {

    await this.getCourses(this.search, 1);
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 500);
  }

  async onIonInfinite(ev) {

    if (this.last_page > this.page) {
      await this.getCourses(this.search, this.page + 1);
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  parentback() {
    this.nav.pop()
  }
}

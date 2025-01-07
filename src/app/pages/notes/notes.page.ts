import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage extends BasePage implements OnInit {
  user;
  search = '';
  page = 1;
  last_page = -1;
  list: any[] = [];
  course;
  isSearchBarShow = false;
  status;
  categoryId;
  pageTitle = 'My Courses'

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {

    this.user = this.users.getUser();
    this.getCourses('', 1)

    this.events.subscribe('initilize-the-list', (res) => {
      this.getCourses('', 1)
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

  back(){
    //this.nav.pop('/tabs/teacher-dashboard')
    this.nav.pop()
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
      const res = this.categoryId ? await this.network.getOtherCourseList(obj) as any : await this.network.getMyCourseList(obj, this.user.id) as any;
      const result = res.result;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result["data"];
      } else {
        this.list = [...this.list, ...result["data"]]
      }
      if (this.list.length == 0) {
        this.pageTitle = `My Courses`;
      } else {
        this.pageTitle = `My Courses (${result.total})`;
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
    this.nav.push('/course-detail', params)

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
    this.nav.pop('/tabs/teacher-dashboard')
  }

  ShowSearchBar(event) {
    this.isSearchBarShow = !this.isSearchBarShow;
  }
}

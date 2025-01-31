import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';
import { FavoriteCoursesSqService } from 'src/app/services/sqlite/favorite-courses-sq.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss']
})
export class FavCoursesPage extends BasePage implements OnInit {

  user;
  list;
  page = 1;
  last_page = -1;
  courseids;
  loading= false;
  view = 'course';

  constructor(
    injector: Injector,
    private globalFavCoursesService: GlobalFavCoursesService
  ) {
    super(injector);

  }



  ngOnInit() {
    this.initialize();
  }

  async initialize() {

    this.user = this.users.getUser();

    this.globalFavCoursesService.getList().subscribe((data) => {
      console.log(data)
      this.courseids = (data as any[]).map((item) => item.course_id);
      this.callApi(1)
    });

    // const data = await this.favCourseSqService.list(this.user.id);
    // this.courseids = data.map((item) => item.course_id);

    // this.loading = true;
    // await this.callApi(this.page)
    // this.loading = false;
  }

  callApi(page) {
    return new Promise(async (resolve) => {
      let obj = {
        ids: this.courseids,
        page: page
      };

      let res = await this.network.FavCourseByIds(obj);

      const result = res.result;
      // this.favorites = data.data;
      this.page = result.current_page;
      this.last_page = result.last_page;
      if (this.page == 1) {
        this.list = result['data'];
      } else {
        this.list = [...this.list, ...result['data']];
      }

      resolve(true);
    });

    // this.list = res.trials;
  }

  async onIonInfinite(event) {
    if (this.last_page > this.page) {
      await this.callApi(this.page + 1)
    }

    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // shouldHandleBackToPrevScreen() {
  //   this.nav.pop();
  // }

  // // start
  // toogleView(view) {
  //   this.view = view;
  //   if (view == 'course') {
  //     // this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
  //     // this.nav.pop('');
  //   }
  //   if (view == 'notes'){
  //     // this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');
  //     // this.nav.push('');
  //   }
  // }
  // // end
}

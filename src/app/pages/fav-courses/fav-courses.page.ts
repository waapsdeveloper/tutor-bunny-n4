import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { FavoriteCoursesSqService } from 'src/app/services/sqlite/favorite-courses-sq.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends BasePage implements OnInit {
  user;
  list: any[] = [];
  page = 1;
  last_page = -1;
  courseids: any[] = [];

  constructor(
    injector: Injector,
    private favCourseSqService: FavoriteCoursesSqService,
    public globalCourses: GlobalCoursesService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
  }

  async initialize() {
    this.loadResolvers();
    this.user = this.dataR.user;
    console.log(this.user);
    const data = await this.favCourseSqService.list(this.user.id);
    this.courseids = data.map((item) => item.course_id);
    console.log(this.courseids);
    this.callApi(this.page)
  }

  callApi(page) {
    return new Promise(async (resolve) => {
      let obj = {
        ids: this.courseids,
        page: page
      };

      let res = await this.network.FavCourseByIds(obj);
      console.log(res);
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

  shouldHandleBackToPrevScreen() {
    this.nav.pop();
  }
}

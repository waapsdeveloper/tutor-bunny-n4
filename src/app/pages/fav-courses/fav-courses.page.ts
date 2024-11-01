import { Component, Injector, OnInit } from '@angular/core';
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
    console.log(data);







  }

  shouldHandleBackToPrevScreen() {
    this.nav.pop();
  }
}

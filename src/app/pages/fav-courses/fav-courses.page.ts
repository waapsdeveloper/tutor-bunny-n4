import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends BasePage implements OnInit {
  constructor(
    injector: Injector,
    public authService: AuthenticationService,
    public globalCourses: GlobalCoursesService
  ) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {
    let showFav = false;
    this.events.publish('show-fav-dot', showFav);
  }

  // ionViewWillEnter() {
  //   this.initialize()
  // }

  async initialize() {
    // this.events.subscribe("fav-list-length", (data) => {
    //   if (data.data) {
    //     const d = data.data;
    //     let cp = d.current_page;
    //     let ls = d.data;
    //     this.listCount = cp == 1 && ls.length == 0 ? 0 : -1;
    //   }
    // })
  }

  shouldHandleBackToPrevScreen() {
    // this.modals.dismiss();
    this.nav.pop();
  }
}

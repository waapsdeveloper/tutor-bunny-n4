import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage {



  constructor( public globalCourses: GlobalCoursesService) {

  }
  async handleRefresh(event) {

    await this.globalCourses.getCoursesFromApi('', 1);
    event.target.complete();
  }

  async onIonInfinite(ev) {
    if (this.globalCourses.page <= this.globalCourses.last_page) {
      const np = this.globalCourses.page + 1;
      await this.globalCourses.getCoursesFromApi('', np);
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }
}

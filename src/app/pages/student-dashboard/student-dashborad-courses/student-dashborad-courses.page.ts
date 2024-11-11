import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage extends BasePage implements OnInit {
  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.events.subscribe('update-course-price', async () => {
      await this.globalCourses.getCoursesFromApi('', 1);
    });
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

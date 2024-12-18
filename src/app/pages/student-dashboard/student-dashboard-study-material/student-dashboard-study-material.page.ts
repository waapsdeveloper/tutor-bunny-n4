import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashboard-study-material',
  templateUrl: './student-dashboard-study-material.page.html',
  styleUrls: ['./student-dashboard-study-material.page.scss'],
})
export class StudentDashboardStudyMaterialPage extends BasePage implements OnInit {
  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.events.subscribe('update-study-material-price', async () => {
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

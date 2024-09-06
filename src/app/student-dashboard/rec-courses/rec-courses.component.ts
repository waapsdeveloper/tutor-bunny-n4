import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-rec-courses',
  templateUrl: './rec-courses.component.html',
  styleUrls: ['./rec-courses.component.scss'],
})
export class RecCoursesComponent extends BasePage {
  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
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

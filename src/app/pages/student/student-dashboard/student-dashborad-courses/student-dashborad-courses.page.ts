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

  list$;

  constructor(injector: Injector, public globalCoursesService: GlobalCoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.globalCoursesService.getList().subscribe((res) => {
      this.list$ = res;
    });
  }

  async handleRefresh(event) {
    await this.globalCoursesService.getGlobalCoursesFromApi('', 1);
    event.target.complete();
  }

  async onIonInfinite(ev) {
    if (this.globalCoursesService.page <= this.globalCoursesService.last_page) {
      const np = this.globalCoursesService.page + 1;
      await this.globalCoursesService.getGlobalCoursesFromApi('', np);
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  openDetails(item: any) {
    // this.nav.push('/course-detail', {course_id: item.id})
    this.nav.push('./student-course-detail', {course_id: item.id})
  }
}

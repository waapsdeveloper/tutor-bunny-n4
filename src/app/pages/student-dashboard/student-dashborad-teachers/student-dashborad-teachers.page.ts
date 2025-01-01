import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
import { GlobalTeacherService } from 'src/app/services/global-teacher.service';

@Component({
  selector: 'app-student-dashborad-teachers',
  templateUrl: './student-dashborad-teachers.page.html',
  styleUrls: ['./student-dashborad-teachers.page.scss'],
})
export class StudentDashboradTeachersPage extends BasePage implements OnInit {

  list$;

  constructor(
    injector: Injector,
    public globalTeacherService: GlobalTeacherService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.globalTeacherService.getList().subscribe((res) => {
      this.list$ = res;
    });
  }

  async handleRefresh(event) {
    this.globalTeacherService.getGlobalTeachersFromApi('', 1);
    event.target.complete();
  }

  async onIonInfinite(ev) {
    if (
      this.globalTeacherService.page <=
      this.globalTeacherService.last_page
    ) {
      const np = this.globalTeacherService.page + 1;
      await this.globalTeacherService.getGlobalTeachersFromApi(
        '',
        np
      );
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  openDetails(item: any) {
    this.nav.push('/material-detail', { material_id: item.id });
  }
}

import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';

@Component({
  selector: 'app-student-dashboard-study-material',
  templateUrl: './student-dashboard-study-material.page.html',
  styleUrls: ['./student-dashboard-study-material.page.scss'],
})
export class StudentDashboardStudyMaterialPage
  extends BasePage
  implements OnInit
{
  list$;

  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  ngOnInit() {

    this.globalStudyMaterialService.getList().subscribe((res) => {
      this.list$ = res;
    }); 

  }

  async handleRefresh(event) {
    this.globalStudyMaterialService.getGlobalStudyMaterialFromApi('', 1);
    event.target.complete();
  }

  async onIonInfinite(ev) {
    if (this.globalStudyMaterialService.page <= this.globalStudyMaterialService.last_page) {
      const np = this.globalStudyMaterialService.page + 1;
      await this.globalStudyMaterialService.getGlobalStudyMaterialFromApi('', np);
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  openDetails(item: any) {
    this.nav.push('/material-detail', {material_id: item.id})
  }
}

import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';

@Component({
  selector: 'app-student-dashboard-study-material',
  templateUrl: './student-dashboard-study-material.page.html',
  styleUrls: ['./student-dashboard-study-material.page.scss'],
})
export class StudentDashboardStudyMaterialPage extends ListPage implements OnInit {
  
  list$;

  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  ngOnInit() {
    this.resetAndFetch();
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalStudyMaterialService.getMyStudyMaterialFromApi(page, search);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }


  openDetails(item: any) {
    this.nav.push('/student-material-detail', {material_id: item.id})
  }
}

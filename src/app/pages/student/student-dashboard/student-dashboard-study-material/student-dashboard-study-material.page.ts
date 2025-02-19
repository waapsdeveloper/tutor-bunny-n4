import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';

@Component({
  selector: 'app-student-dashboard-study-material',
  templateUrl: './student-dashboard-study-material.page.html',
  styleUrls: ['./student-dashboard-study-material.page.scss'],
})
export class StudentDashboardStudyMaterialPage extends ListPage implements OnInit {

  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalStudyMaterialService.getGlobalStudyMaterialFromApi(page, search);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }

   hostScreensize = -1;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.updateColumnClass(event.target.innerWidth);
    }

    updateColumnClass(width: number) {
      this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
    }

  ngOnInit() {
    // this.globalStudyMaterialService.getList().subscribe(data => {
    //   this.list = data;
    // });
    this.updateColumnClass(window.innerWidth);
    this.resetAndFetch();
  }


  openDetails(item: any) {
    this.nav.push('/student-material-detail', {material_id: item.id})
  }
}

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

  keyword: any;
  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
    this.events.subscribe('tag-input-search-triggered',this.triggerSearchWithParams.bind(this), false);
  }

  triggerSearchWithParams(params) {
    console.log('triggerSearch', params);
    this.keyword = params;
    this.resetAndFetch();
    // this.updateViewDetails({
    //   search: params.text,
    // });
    // this.cdr.detectChanges();
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const user = this.users.getUser();

    let obj = {
      type: "material",
      keyword_id: this.keyword.id,
      page: page,
      user_id: user.id,
    };

    let res = await this.network.getGlobalSearch(obj);

    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  ngOnInit() {
    // this.globalStudyMaterialService.getList().subscribe(data => {      
    //   this.list = data;
    // });
    this.resetAndFetch();
  }


  openDetails(item: any) {
    this.nav.push('/student-material-detail', {material_id: item.id})
  }
}

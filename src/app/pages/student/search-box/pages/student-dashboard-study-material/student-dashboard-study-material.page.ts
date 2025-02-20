import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ViewWillEnter } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-student-dashboard-study-material',
  templateUrl: './student-dashboard-study-material.page.html',
  styleUrls: ['./student-dashboard-study-material.page.scss'],
})
export class StudentDashboardStudyMaterialPage extends ListPage implements OnInit, ViewWillEnter {  

  keyword: any;
  filters: any = null;

  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService, public searchFilterService: SearchFilterService,) {
    super(injector);
    // this.events.subscribe('tag-input-search-triggered',this.triggerSearchWithParams.bind(this), false);
    this.events.subscribe('tag-filter-result-triggered', this.getResultsByFilter.bind(this), false);
  }
  

  // triggerSearchWithParams(params) {
  //   console.log('triggerSearch', params);
  //   this.keyword = params;
  //   this.resetAndFetch();
  //   // this.updateViewDetails({
  //   //   search: params.text,
  //   // });
  //   // this.cdr.detectChanges();
  // }

  getResultsByFilter(data){
    console.log('getResultsByFilter', data);
    this.filters = data;
    this.resetAndFetch(); 
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const user = this.users.getUser();

    this.filters = await this.searchFilterService.getFormDataPromise();

    let obj = {
      type: "material",      
      page: page,
      user_id: user.id,
      keyword_id: this.keyword ? this.keyword.id : null,
      keywords: this.filters?.keywords || [],
      language_id: this.filters?.language?.id || null,
      price: this.filters?.price || null,
      teacher_name: this.filters?.name || null,
      country_id: this.filters?.country?.id || null,
    };

    let filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null)
    );

    let res = await this.network.getGlobalSearch(filteredObj);

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

  ionViewWillEnter(): void {
    this.resetAndFetch();
  }


  openDetails(item: any) {
    this.globalStudyMaterialService.setItem(item);
    this.nav.push('/student-material-detail', {material_id: item.id})
  }
}

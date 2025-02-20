import { Component, Injector, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage extends ListPage implements OnInit {
  keyword: any;
  filters: any = null;

  constructor(
    injector: Injector,
    public globalCoursesService: GlobalCoursesService,
    public searchFilterService: SearchFilterService
  ) {
    super(injector);
    // this.events.subscribe(
    //   'tag-input-search-triggered',
    //   this.triggerSearchWithParams.bind(this),
    //   false
    // );
    this.events.subscribe(
      'tag-filter-result-triggered',
      this.getResultsByFilter.bind(this),
      false
    );
  }

  ngOnInit(): void {
    this.resetAndFetch();
  }

  // triggerSearchWithParams(params) {
  //   console.log('triggerSearch', params);
  //   this.keyword = params;

    
  //   // this.updateViewDetails({
  //   //   search: params.text,
  //   // });
  //   // this.cdr.detectChanges();
  // }

  getResultsByFilter(data) {
    console.log('getResultsByFilter', data);                           
    this.filters = data;
    this.resetAndFetch();
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {

    this.filters = await this.searchFilterService.getFormDataPromise();

    let obj = {
      type: 'course',
      page: page,
      keyword_id: this.keyword ? this.keyword.id : null,
      keywords: this.filters?.keywords || [],
      language_id: this.filters?.language?.id || null,
      travel_policy_id: this.filters?.travel_policy?.id || null,      
      price: this.filters?.price || null,
      mode: this.filters?.mode_type || null,
      capacity: this.filters?.capacity || null,
      hourly_rate: this.filters?.hourly_rate || null,
      teacher_name: this.filters?.name || null,
      country_id: this.filters?.country?.id || null,
      from_age: this.filters?.age?.from_age || null,
      to_age: this.filters?.age?.to_age || null,
    };

    // Remove keys with null values
    let filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null)
    );

    let res = await this.network.getGlobalSearch(filteredObj);
    console.log('fetchList', res);

    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  openDetails(item: any) {
    this.globalCoursesService.setItem(item)
    this.nav.push('./student-course-detail', { course_id: item.id });
  }
}

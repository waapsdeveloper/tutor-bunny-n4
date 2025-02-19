import { Component, Injector, OnInit } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';

@Component({
  selector: 'app-student-dashborad-teachers',
  templateUrl: './student-dashborad-teachers.page.html',
  styleUrls: ['./student-dashborad-teachers.page.scss'],
})
export class StudentDashboradTeachersPage extends ListPage implements OnInit {
  
  keyword: any;
  filters: any = null;
  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.events.subscribe('tag-input-search-triggered',this.triggerSearchWithParams.bind(this), false);
    this.events.subscribe('tag-filter-result-triggered', this.getResultsByFilter.bind(this), false);
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

  getResultsByFilter(data){
    console.log('getResultsByFilter', data);
    this.filters = data;
    this.resetAndFetch();
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    
    const user = this.users.getUser();

    let obj = {
      type: "teacher",
      page: page,
      user_id: user.id,      
      keyword_id: this.keyword ? this.keyword.id : null,
      country_id: this.filters?.country?.id || null,      
      travel_policy_id: this.filters?.travel_policy?.id || null,
      hourly_rate: this.filters?.hourly_rate || null,
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
    this.resetAndFetch();
  }


  openDetails(item: any) {
    const params = {
      teacher_id: item.id,
    };
    this.nav.push('/student-teacher-profile', params);
  }w
}

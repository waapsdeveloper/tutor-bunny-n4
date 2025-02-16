import { Component, Injector, OnInit } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';

@Component({
  selector: 'app-student-dashborad-teachers',
  templateUrl: './student-dashborad-teachers.page.html',
  styleUrls: ['./student-dashborad-teachers.page.scss'],
})
export class StudentDashboradTeachersPage extends ListPage implements OnInit {
  
  keyword: any;
  constructor(
    injector: Injector,
  ) {
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
      type: "teacher",
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
    this.resetAndFetch();
  }


  openDetails(item: any) {
    const params = {
      teacher_id: item.id,
    };
    this.nav.push('/student-teacher-profile', params);
  }w
}

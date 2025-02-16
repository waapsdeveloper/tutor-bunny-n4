import { Component, Injector, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage extends ListPage implements OnInit {

  keyword: any;

  constructor(
    injector: Injector,
    // public globalCoursesService: GlobalCoursesService
  ) {
    super(injector);
    this.events.subscribe('tag-input-search-triggered',this.triggerSearchWithParams.bind(this), false);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
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
    let obj = {
      type: "course",
      keyword_id: this.keyword.id,
      page: page,
    };
    let res = await this.network.getGlobalSearch(obj);
    console.log('fetchList', res);

    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  openDetails(item: any) {
    this.nav.push('./student-course-detail', { course_id: item.id });
  }
}

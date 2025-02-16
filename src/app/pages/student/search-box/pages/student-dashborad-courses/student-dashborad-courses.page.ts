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

  private _keyword: any;
  @Input()
  set keyword(value: any) {
    this._keyword = value;
    this.resetAndFetch();
  }
  get keyword(): any {
    return this._keyword;
  }




  constructor(
    injector: Injector,
    public globalCoursesService: GlobalCoursesService
  ) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    let obj = {
      type: "course",
      keyword_id: this.keyword.id,
      page: page,
      liked: false,
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
    // this.resetAndFetch();
  }

  openDetails(item: any) {
    this.nav.push('./student-course-detail', { course_id: item.id });
  }
}

import { Component, Injector, OnInit } from '@angular/core';
import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';
import { ListPage } from 'src/app/base-page/list-page';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends ListPage implements OnInit {
  
  constructor(
    injector: Injector,
    private globalFavCoursesService: GlobalFavCoursesService
  ) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const data = await this.globalFavCoursesService.getListPromise();    
    const courseids = (data as any[]).map((item) => item.course_id);

    let obj = {
      ids: courseids,
      page: page,
    };

    let res = await this.network.favCourseByIds(obj);
    console.log(res)
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
    this.nav.push('course-detail', { course_id: item.id });
  }


 
}

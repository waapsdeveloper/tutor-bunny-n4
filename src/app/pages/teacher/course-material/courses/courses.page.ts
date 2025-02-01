import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { ListPage } from 'src/app/base-page/list-page';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage extends ListPage implements OnInit {
  

  constructor(injector: Injector, public globalCoursesService: GlobalCoursesService) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalCoursesService.getMyCoursesFromApi(page, search);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }

  ngOnInit() {
    this.resetAndFetch();
  }

  openDetails(item: any) {    
    this.nav.push('course-detail', {course_id: item.id})
  }


}

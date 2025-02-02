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
  
  list$;

  constructor(injector: Injector, public globalCoursesService: GlobalCoursesService) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalCoursesService.getMyCoursesFromApi(page, search);
    
    let pagination = {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };

    this.globalCoursesService.setList(pagination.list, pagination.page, pagination.last_page, pagination.total)

    return pagination;
  }

  ngOnInit() {
    // this.resetAndFetch();
    this.globalCoursesService.getList().subscribe( (data) => {
      this.list$ = data;
    });
  }

  openDetails(item: any) {    
    this.nav.push('course-detail', {course_id: item.id})
  }


}

import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage extends ListPage implements OnInit {

  constructor(injector: Injector, public globalCoursesService: GlobalCoursesService) {
    super(injector);
  }

  

  async fetchList(page: number, search: string, status: string): Promise<any> {    

    let obj = {
      page: page,
      liked: false,
    };

    let res = await this.network.getAllCourses(obj);

    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  ngOnInit() {
    this.globalCoursesService.getList().subscribe((res) => {
      this.list = res;
    });
  }

  openDetails(item: any) {
    this.nav.push('./student-course-detail', {course_id: item.id})
  }
}

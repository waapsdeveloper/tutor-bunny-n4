import { Component, Injector, OnInit } from '@angular/core';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-dashborad-courses',
  templateUrl: './student-dashborad-courses.page.html',
  styleUrls: ['./student-dashborad-courses.page.scss'],
})
export class StudentDashboradCoursesPage implements OnInit {

  constructor( public globalCourses: GlobalCoursesService) {

  }

  ngOnInit() {
  }
  async handleRefresh(event) {

    await this.globalCourses.getCoursesFromApi('', 1);
    event.target.complete();
  }
}

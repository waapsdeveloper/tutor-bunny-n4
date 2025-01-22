import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.page.html',
  styleUrls: ['./course-material.page.scss'],
})
export class CourseMaterialPage {

  constructor(private nav: NavService) { }

  // start
  view = 'course';

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.nav.push('tabs/course-material/courses');
    }
    if (view == 'notes'){
      this.nav.push('tabs/course-material/notes');
    }
  }
  // end

  goback(){
    this.nav.pop('/tabs/teacher-dashboard');
  }

}

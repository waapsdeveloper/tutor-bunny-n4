import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-study-material-list',
  templateUrl: './study-material-list.component.html',
  styleUrls: ['./study-material-list.component.scss'],
})
export class StudyMaterialListComponent extends BasePage implements OnInit {


  user;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
  }


  ngOnInit() {

    this.events.subscribe('data-for-other-corses', (data: any) => {
      this.user = data.user;
      this.globalCourses.getOtherCourses(data.user.id, data.id);
    })

  }


  async oepnDeatils(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    this.onChange.emit(params);


  }


}

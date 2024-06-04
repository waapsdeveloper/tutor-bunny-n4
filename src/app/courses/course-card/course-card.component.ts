import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent extends BasePage implements OnInit {
list;
course
  constructor(injector: Injector) { 
    super(injector) 
    this.initialize()
  }

  ngOnInit() { }

  async initialize(){
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    this.list = await this.network.getCourseList(user.id) as any [];
    console.log(this.list);

    this.course = this.list.result
    
    
  }

}

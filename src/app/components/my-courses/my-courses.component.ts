import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent extends BasePage implements OnInit {
  user;
  search = '';
  page = 1;
  last_page = -1;
  list: any[] = [];
  count;
  course;
  teacher;
  status;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  categoryId;
  constructor(injector: Injector) {
    super(injector)
    this.getCourses()
  }

  ngOnInit() { }

  async getCourses(search = '', page = 1) {

    return new Promise(async resolve => {
      let obj = {
        search: search,
        page: page
      }

      if (this.categoryId) {
        obj['category_id'] = this.categoryId
      }
      console.log(this.categoryId);
      console.log(obj);
      let role = localStorage.getItem("role")
      if(role == '3'){
        this.user = this.users.getUser()
        let obj = {
          search: search,
          page: page,
          user_id: this.user.id
        }

        if (this.categoryId) {
          obj['category_id'] = this.categoryId
        }
        const res =  await this.network.getMyCourseList(obj, this.user.id) as any;
        // await this.network.getOtherCourseList(obj) as any;
        console.log(res);

        const result = res.result;
        this.count = res.result.total
        this.page = result.current_page;
        this.last_page = result.last_page;
        if (this.page == 1) {
          this.list = result["data"];
        } else {
          this.list = [...this.list, ...result["data"]]
        }
        this.onChange.emit(result);
      }
      else{
        this.teacher = JSON.parse(localStorage.getItem('teacher'));
        console.log(this.teacher);
        let obj = {
          search: search,
          page: page,
        }

        if (this.categoryId) {
          obj['category_id'] = this.categoryId
        }
        const res =  await this.network.getMyCourseList(obj, this.teacher.id) as any;
        // await this.network.getOtherCourseList(obj) as any;
        console.log(res);

        const result = res.result;
        this.count = res.result.total
        this.page = result.current_page;
        this.last_page = result.last_page;
        if (this.page == 1) {
          this.list = result["data"];
        } else {
          this.list = [...this.list, ...result["data"]]
        }
        this.onChange.emit(result);
      }

      resolve(true)
    })


  }

  seeAll(){
    let role = localStorage.getItem("role")
    if(role == '2'){
    let params ={
      user: JSON.stringify(this.teacher)
    }

    this.nav.push('teacher-course-list', params)
  }else{
    this.nav.push('courses')

  }
}
}

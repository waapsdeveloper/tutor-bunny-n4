import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Input,
  Output,

} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent {



  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateUserDetails(value);
  }

  get data(): any {
    return this._data;
  }


  heading: string = '';
  list: any[] = [];

  @Output() seeallEmit = new EventEmitter<any>();
  @Output() clickOpen = new EventEmitter<any>()

  constructor() {

  }


  updateUserDetails(value: any){

    if (value) {
      this.heading = value.heading || '';
      this.list = value.list || [];
    }

  }
  emitSeeAll() {
    this.seeallEmit.emit();
    console.log("EMitted")
  }

  // async updateUserDetails2(data) {

  //   return new Promise(async (resolve) => {
  //     let obj = {
  //       search: search,
  //       page: page,
  //     };

  //     if (this.categoryId) {
  //       obj['category_id'] = this.categoryId;
  //     }


  //     let role = localStorage.getItem('role');
  //     if (role == '3') {
  //       this.user = this.users.getUser();
  //       let obj = {
  //         search: search,
  //         page: page,
  //         user_id: this.user.id,
  //       };

  //       if (this.categoryId) {
  //         obj['category_id'] = this.categoryId;
  //       }
  //       const res = (await this.network.getMyCourseList(
  //         obj,
  //         this.user.id
  //       )) as any;
  //       // await this.network.getOtherCourseList(obj) as any;


  //       const result = res.result;
  //       this.count = res.result.total;
  //       this.page = result.current_page;
  //       this.last_page = result.last_page;
  //       if (this.page == 1) {
  //         this.list = result['data'];
  //       } else {
  //         this.list = [...this.list, ...result['data']];
  //       }
  //       this.onChange.emit(result);
  //     } else {
  //       this.teacher = JSON.parse(localStorage.getItem('teacher'));

  //       let obj = {
  //         user_id: this.teacher.id,
  //       };


  //       let res = await this.network.getTeacherCourses(obj);


  //       const result = res.result;
  //       this.count = res.result.total;
  //       this.page = result.current_page;
  //       this.last_page = result.last_page;
  //       if (this.page == 1) {
  //         this.list = result['data'];
  //       } else {
  //         this.list = [...this.list, ...result['data']];
  //       }
  //       this.onChange.emit(result);
  //     }

  //     resolve(true);
  //   });
  // }

  // seeAll() {
  //   let role = localStorage.getItem('role');
  //   if (role == '2') {
  //     let params = {
  //       user_name: this.teacher.name,
  //       user_id : this.teacher.id
  //     };

  //     // return

  //     this.nav.push('teacher-course-list', params);
  //   } else {
  //     let params = {
  //       user_name: this.user.name,
  //       user_id : this.user.id
  //     };

  //     // return

  //     this.nav.push('teacher-course-list', params);
  //   }
  // }
}

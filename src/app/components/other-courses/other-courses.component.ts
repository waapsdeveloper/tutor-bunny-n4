import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-other-courses',
  templateUrl: './other-courses.component.html',
  styleUrls: ['./other-courses.component.scss'],
})
export class OtherCoursesComponent extends BasePage implements OnInit {

  @Input() count = 0;
  @Output() openOtherCourses = new EventEmitter<any>()

  private _list;
  @Input()
  public get list(): any[]{
    return this._list;
  };

  public set list(value: any[]){
    this._list = value;
    console.log(value);
  };


  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {

  }

  // async initialize() {
  //   const obj = {
  //     category_id: this.categoryId
  //   }
  //   const res = await this.network.getOtherCourseList(obj) as any;
  //   console.log(res)

  //   // this.count = this.list.count

  // }
  gotoCourseList() {
    this.openOtherCourses.emit()
    // this.nav.push('/tabs/courses?category_id=')
  }

}

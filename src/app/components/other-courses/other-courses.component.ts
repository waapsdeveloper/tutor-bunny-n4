import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-other-courses',
  templateUrl: './other-courses.component.html',
  styleUrls: ['./other-courses.component.scss'],
})
export class OtherCoursesComponent extends BasePage implements OnInit {
  @Input() count = 0;
  @Output() openOtherCourses = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  private _list;
  @Input()
  public get list(): any[] {
    return this._list;
  }

  public set list(value: any[]) {
    this._list = value;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {

  }

  gotoCourseList() {
    this.openOtherCourses.emit();
  }

  getOtherCourse(events) {

    this.onChange.emit(events);
  }
}

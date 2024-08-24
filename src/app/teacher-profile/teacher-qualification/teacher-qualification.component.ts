import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-qualification',
  templateUrl: './teacher-qualification.component.html',
  styleUrls: ['./teacher-qualification.component.scss'],
})
export class TeacherQualificationComponent extends BasePage implements OnInit {
  private _user: any;

  @Input('user')
  public get user() {
    return this._user;
  };

  public set user(value: any) {
    this._user = value;
    console.log(value);
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log();

  }

  back() {
    this.modals.dismiss();
  }
}

import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-qualification',
  templateUrl: './teacher-qualification.component.html',
  styleUrls: ['./teacher-qualification.component.scss'],
})
export class TeacherQualificationComponent extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  back(){
    this.modals.dismiss()
  }

}

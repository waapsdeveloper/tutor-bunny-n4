import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-teacher-welcome',
  templateUrl: './teacher-welcome.page.html',
  styleUrls: ['./teacher-welcome.page.scss'],
})
export class TeacherWelcomePage extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {
  }

  continue(){
    this.modals.dismiss()
  }

}

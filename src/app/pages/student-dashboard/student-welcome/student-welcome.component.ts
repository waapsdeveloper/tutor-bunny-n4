import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-student-welcome',
  templateUrl: './student-welcome.component.html',
  styleUrls: ['./student-welcome.component.scss'],
})
export class StudentWelcomeComponent extends BasePage implements OnInit {


  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  studentContinue(key){
    let obj = {
      key: key
    }
    this.modals.dismiss(obj);

  }
  back(){
    this.modals.dismiss();

  }

}

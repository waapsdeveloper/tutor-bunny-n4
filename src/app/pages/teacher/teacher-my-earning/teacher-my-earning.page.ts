import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-teacher-my-earning',
  templateUrl: './teacher-my-earning.page.html',
  styleUrls: ['./teacher-my-earning.page.scss'],
})
export class TeacherMyEarningPage  {

  constructor(private nav: NavService) { }



  goback(){
    this.nav.pop('/tabs/teacher-dashboard');
  }
}

import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-teacher-credits',
  templateUrl: './teacher-credits.page.html',
  styleUrls: ['./teacher-credits.page.scss'],
})
export class TeacherCreditsPage{

  constructor(private nav: NavService) { }

  goback(){
    this.nav.pop('/tabs/teacher-dashboard');
  }

  buyCredits(){
    this.nav.push('/teacher-credits-buy');
  }
}

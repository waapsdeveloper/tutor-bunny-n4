import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-profile-complete',
  templateUrl: './teacher-profile-complete.page.html',
  styleUrls: ['./teacher-profile-complete.page.scss'],
})
export class TeacherProfileCompletePage extends BasePage implements OnInit {
user
  constructor(injector:Injector) {
    super(injector)
    this.user =this.users.getUser()
   }

  ngOnInit() {
  }

  continue(){
    this.nav.push("/tabs/teacher-dashboard")
  }

}

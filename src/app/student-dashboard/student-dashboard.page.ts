import { Component, Injector, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavService } from '../services/nav.service';
import { NetworkService } from '../services/network.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage extends BasePage implements OnInit {

  user;
  displayName: string = '';

  constructor(injector: Injector, public authService: AuthenticationService,) {
    super(injector)
  }

  ngOnInit() {
    this.initialize()
  }


  async initialize() {
    this.user = this.users.getUser();
    let obj = {
      email: this.user.email,
    };
    let res = await this.network.getUserByEmail(obj);
    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
    }

    this.displayName = this.utility.splitName(this.user.name).first_name;

  }



  updateProfile(){
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: 'student-dashboard', showBack: true
    });
  }

}

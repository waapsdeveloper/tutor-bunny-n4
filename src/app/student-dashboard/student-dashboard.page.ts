import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavService } from '../services/nav.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements OnInit {
  user;
  item;
  image;
  constructor(
    private nav: NavService,
    public authService: AuthenticationService,
    private network: NetworkService
  ) {
    this.initialize()
  }
  ngOnInit() {
  }


  async initialize() {
    this.user = JSON.parse(localStorage.getItem('user'));
    let obj = {
      email: this.user.email,
    };
    let item = await this.network.getUserByEmail(obj);
    this.item = item.user;
    localStorage. setItem("user", JSON.stringify(this.item) );

    this.image = this.item.image;

  }

  goToProfile(){
    this.nav.push('student-profile')
  }

}

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
  item;
  name;
  image;
  constructor(
    injector: Injector
  ) {
    super(injector)
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
    console.log(item);
    
    this.item = item.user;
    // return
    this.name = await this.utility.splitName(this.item.name)

    localStorage. setItem("user", JSON.stringify(this.item) );



    this.image = this.item.image;

  }
  

  goToProfile(){
    this.nav.push('student-profile')
  }

}

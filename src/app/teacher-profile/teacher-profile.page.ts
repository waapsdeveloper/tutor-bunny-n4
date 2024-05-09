import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage implements OnInit {
  user;
  data;
  constructor(
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
    let res = await this.network.getUserByEmail(obj);
    this.data = res.user.teacher;
    console.log(this.data);
    

  }
}

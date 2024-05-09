import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-profile-box-student',
  templateUrl: './profile-box-student.component.html',
  styleUrls: ['./profile-box-student.component.scss'],
})
export class ProfileBoxStudentComponent  implements OnInit {
  skills: any[] = ['Guitar', 'Violen', 'Piano', 'Drums'];
  languages: any[] = ['English', 'Hindi'];
  user;
  item;
  image;
  data;
  languges;
  subject;
  constructor(private nav: NavService,
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
    this.image = this.item.image;
    this.data =this.item.teacher;
  }

  openEditProfile() {
    this.nav.push('/student-profile/student-profile-edit');
  }
}

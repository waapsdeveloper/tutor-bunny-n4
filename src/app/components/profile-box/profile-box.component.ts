import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss'],
})
export class ProfileBoxComponent implements OnInit {
  skills: any[] = ['Guitar', 'Violen', 'Piano', 'Drums'];
  languages: any[] = ['English', 'Hindi'];
  user;
  item;
  image;
  data;
  languges;
  subject;
  shield = false;
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
    this.data = this.item.teacher;

    if (this.data.status == 'approved') {
      this.shield = true;
    }
  }

  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit');
  }
  getFlag() {
    if (this.item && this.item.teacher && this.item.teacher.country) {
      console.log(this.item.teacher);

      const flag = this.item.teacher.country.iso2;
      // console.log(flag);

      return flag.toLowerCase();
    }
    else {
      return ""
    }
  }
}

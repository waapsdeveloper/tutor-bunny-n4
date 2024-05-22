import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss'],
})
export class ProfileBoxComponent implements OnInit, ViewWillEnter {
  skills: any[] = ['Guitar', 'Violen', 'Piano', 'Drums'];
  languages: any[] = ['English', 'Hindi'];
  user;
  item;
  image;
  data;
  languges;
  subject;
  shield = false;
  constructor(
    private nav: NavService,
    private network: NetworkService,
    private events : EventsService
  ) {

    this.initialize()
  }

  ngOnInit() {
    this.events.subscribe('get-user-after-submit-form', (user) => {

    })
  }
  ionViewWillEnter(): void {
    this.initialize()
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
      const flag = this.item.teacher.country.iso2;
      return flag.toLowerCase();
    }
    else {
      return ""
    }
  }
}

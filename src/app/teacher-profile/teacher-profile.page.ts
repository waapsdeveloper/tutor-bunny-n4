import { Component, Injector, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { ViewWillEnter } from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { NavService } from '../services/nav.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage extends BasePage implements OnInit, ViewWillEnter {
  user;
  item;
  data;
  shield;
  image;
  isExpanded = false;
  city;
  country;
  language;
  subject;


  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {

    this.user = this.users.getUser()

    this.events.subscribe('get-user-after-submit-form', (data) => {

    })
  }
  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit', {
      backUrl: '/teacher-profile?user_id=' + this.user.id, showBack: false, title: 'Edit Profile'
    })
  }
  getFlag() {
    if (this.item && this.item.teacher && this.item.teacher.country) {

      const flag = this.item.teacher.country.iso2;
      // console.log(flag);

      return flag.toLowerCase();
    }
    else {
      return ""
    }
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
    this.city = this.item.teacher.city;
    this.country = this.item.teacher.country.name;
    this.language = this.item.teacher.languages;
    this.subject = this.item.teacher.subjects;


    if (this.data.status == 'approved') {
      this.shield = true;
    }
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

}

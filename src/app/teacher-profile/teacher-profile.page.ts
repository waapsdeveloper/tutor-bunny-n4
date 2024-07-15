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
  displayName = 'LL'
  flag
  showGellary= false;
  item;
  data;
  shield;
  isExpanded = false;
  country;
  city;
  language;
  state
  subject;
  images: any;


  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {
    this.events.subscribe('get-user-after-submit-form', (data) => {
    })
  }

  ionViewWillEnter() {
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
      this.flag = this.getFlag()
      this.displayName = this.utility.getAmericanName(this.user.name);
      this.country = this.user.teacher.country.name;
      this.state = this.user.teacher.state.name;
      this.city = this.user.teacher.city;
      this.language = this.user.teacher.languages;
      this.subject = this.user.teacher.subjects;
      const user = this.users.getUser();
      const data = await this.network.getImage(user.id) as any;
      this.images = data.result;
      console.log(this.images.length);
      if(this.images.length != 0){

        this.showGellary = true;


      }
    }

    // if (this.data.status == 'approved') {
    //   this.shield = true;
    // }
  }


  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit', {
      backUrl: '/tabs/teacher-profile?user_id=' + this.user.id, showBack: true, title: 'Edit Profile'
    })
  }
  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }


  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

}
